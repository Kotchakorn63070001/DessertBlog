const { escapeRegExpChars } = require("ejs/lib/utils");
const express = require("express");
const { json } = require("express/lib/response");
const pool = require("../config");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// // กำหนดว่าจะให้ multer เอารูปไปไว้ที่ไหน
// var storage = multer.diskStorage({
//     destination: function (req, file, callback){
//       callback(null, './static/uploads')
//     },
//     filename: function (req, file, callback){
//       callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage: storage })


// Get comment
router.get('/:postId/comments', async function(req, res, next){
    try {
        const [rows, fields] = await pool.query("SELECT * FROM comment WHERE post_id = ?",
        [req.params.blogId]);
        // console.log('Get comment = ', rows)
        return res.send({
            comment: {
                comment: rows[0].comment,
                like: rows[0].like,
                comment_date: rows[0].comment_date,
                comment_by_id: rows[0].comment_by_id,
                blog_id: rows[0].blog_id
            }
        })
    } catch (err){
        return next(err);
    }

});

// Create new comment
router.post('/:postId/comments', upload.single('comment_image'), async function(req, res, next){
    
    // console.log(req.body)
    const comment = req.body.comment;
    const file = req.file;

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    console.log(req.params.blogId)

    try{
        const [rows, fields] = await conn.query(
            'INSERT INTO comments(blog_id, comment, comments.like, comment_date, comment_by_id) VALUES(?, ?, 0, CURRENT_TIMESTAMP, null)',
            [req.params.blogId, comment]
        );

        console.log(rows.insertId)
        console.log(req.params.blogId)

        const [rows1, fields1] = await conn.query(
            'INSERT INTO images(blog_id, comment_id, file_path, upload_date, main) VALUES(?, ?, ?, CURRENT_TIMESTAMP, 0)',
            [req.params.blogId, rows.insertId, file.path.substring(6)]
        );
        

        // const [rows2, fields2] = await conn.query(
        //     'SELECT * FROM images LEFT JOIN comments ON images.comment_id=comments.id WHERE comments.blog_id=? AND comment_id IS NOT NULL',
        //     [req.params.blogId]
        // )
        
        // console.log(rows2[0])
        await conn.commit()
        // res.render("blogs/detail", { 
        //     // search: req.query.search || '', 
        //     // blogs: rows 
        //     commentImage: rows2[0]
        //   });    
        
        res.redirect('/');
    } catch (err){
        console.log(err)
        await conn.rollback()
    } finally {
        console.log('finally create comment')
        await conn.release()
    }
    
    // try {
    //     const [rows, fields] = await pool.query(
    //         "INSERT INTO comments(blog_id, comment, comments.like, comment_by_id) VALUES(?, ?, ?, ?)",
    //         [req.params.blogId, 'new comment', 0, null]);
    //     return res.send({
    //         message: "A new comment is added (ID: " + rows.insertId + ")"
    //     })
    // } catch (err){
    //     return next(err);
    // }
});

// Update comment
router.put('/comments/:commentId', async function(req, res, next){
    try{
        const [rows, fields] = await pool.query("UPDATE comments SET comment=?, comments.like=?, comment_date=?, comment_by_id=?, blog_id=? WHERE id=?",
        ['edit comment', 0, '2021-12-31', null, 1, req.params.commentId]);
        // console.log(rows)

        const [rows2, fields2] = await pool.query("SELECT * FROM comments WHERE id=?",
        [req.params.commentId])
        // console.log(rows2)
        return res.send({
            message: "Comment ID " + req.params.commentId + " is updated.",
            comment: {
                comment: rows2[0].comment,
                like: rows2[0].like,
                comment_date: rows2[0].comment_date,
                comment_by_id: rows2[0].comment_by_id,
                blog_id: rows2[0].blog_id
            }
        })
        // return res.send({
        //     message: "Comment ID " + req.params.commentId + " is updated.",
        //     comment: {
        //         comment: rows
        //     }
        // })
    } catch (err){
        return next(err)
    }

});

// Delete comment
router.delete('/comments/:commentId', async function(req, res, next){
    try{
        const [rows, fields] = await pool.query("DELETE FROM comments WHERE id=?",
        [req.params.commentId])
        return res.send({
            message: "Comment ID " + req.params.commentId + " is deleted."
        })
    } catch (err){
        return next(err)
    }
});

// Add comment like
// router.put('/comments/addlike/:commentId', async function(req, res, next){
//     try{
//         const [rows, fields] = await pool.query("SELECT * FROM comments WHERE id=?",
//         [req.params.commentId]);

//         let likeNum = rows[0].like
//         console.log('Like num =', likeNum) // console.log() จำนวน Like ออกมาดู
//         //เพิ่มจำนวน like ไปอีก 1 ครั้ง
//         likeNum += 1
    
//         //Update จำนวน Like กลับเข้าไปใน DB
//         const [rows2, fields2] = await pool.query("UPDATE comments SET comments.like=? WHERE comments.id=?", [
//           likeNum, req.params.commentId
//         ]);

//         const [rows3, fields3] = await pool.query("SELECT * FROM comments WHERE comments.id=?", [
//             req.params.commentId
//         ]);

//         return res.send({
//             blogId: rows3[0].blog_id,
//             commentId: rows3[0].id,
//             likeNum: rows3[0].like //5 คือจำนวน like ของ comment ที่มี id = 20 หลังจาก +1 like แล้ว
//         })
//       } catch (err) {
//         return next(err);
//       }
// });


exports.router = router
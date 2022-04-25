const express = require("express");
const multer = require("multer");
const path = require("path")
const pool = require("../config");
const fs = require("fs");

var storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, './static/uploads')
    },
    filename: function (req, file, callback){
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

router = express.Router();



router.get('/create', async function(req, res, next){
    res.render('create')
    // res.send('Hello World!')
})

router.post('/create', upload.single('mainImage'), async function(req, res, next){
    const title = req.body.title
    const description = req.body.description
    const file = req.file

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        const [rows, fields] = await conn.query(
            'INSERT INTO post(title, date, img, description, user_id, post_type_id) VALUES(?, CURRENT_TIMESTAMP, ?, ? ,?, ?)',
            [title, file.path.substring(6), description, 1, 1]
        )
        await conn.commit()

    } catch (err){
        console.log(err)
        await conn.rollback()
    } finally {
        console.log('finally create post')
        await conn.release()
    }
    res.redirect('/')
});


// เพิ่มยอดไลค์
router.put("/posts/addlike/:postId", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try{
        const [rows, fields] = await pool.query("SELECT * FROM post WHERE post_id=?", [
          req.params.postId,
        ]);
        let likeNum = rows[0].num_like
        // console.log('Like num =', likeNum) 
        likeNum += 1
  
        //Update จำนวน Like กลับเข้าไปใน DB
        await pool.query("UPDATE post SET post.num_like=? WHERE post_id=?", [
          likeNum, req.params.postId,
        ]);

        await conn.commit();
        res.json({ like: likeNum });
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err);
    } finally {
        console.log("finally add like post");
        conn.release();
    }
  });
  
  router.get("/posts/:id", function (req, res, next) {
    const promise1 = pool.query("SELECT * FROM post JOIN content USING (post_id) WHERE post_id=?", [
      req.params.id,
    ]);
    const promise2 = pool.query("SELECT * FROM content JOIN content_ingredient USING (content_id) WHERE post_id=?", [
      req.params.id,
    ]);
    const promise3 = pool.query("SELECT * FROM content JOIN content_cooking_method USING (content_id) WHERE post_id=?", [
      req.params.id,
    ]);

    Promise.all([promise1, promise2, promise3])
      .then((results) => {
        const posts = results[0];
        const ingredients = results[1];
        const methods = results[2];
        console.log(posts[0][0])
        console.log(ingredients[0])
        res.json({
          posts: posts[0][0],
          ingredients: ingredients[0],
          methods: methods[0],
          error: null,
        });
        // res.send({
        //   blog: blogs[0][0],
        //   comments: comments[0],
        //   images: images[0],
        //   error: null,
        // })
      })
      .catch((err) => {
        return next(err);
      });
  });

exports.router = router;
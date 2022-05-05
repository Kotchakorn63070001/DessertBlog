const { escapeRegExpChars } = require("ejs/lib/utils");
const express = require("express");
// const { json } = require("express/lib/response");
const pool = require("../config");
// const multer = require("multer");
// const path = require("path");
const router = express.Router();


const { isLoggedIn } = require('../middlewares')

const commentOwner = async (req, res, next) => {
    if (req.user.role === 'admin') {
        return next()
      }
    
    const [[comment]] = await pool.query('SELECT * FROM comment WHERE comment_id=?', [req.params.commentId])
    if (comment.user_id !== req.user.user_id) {
      return res.status(403).send('You do not have permission to perform this action')
    }
  
    next()
}

// Get comment
router.get('/:id/comments',isLoggedIn, function(req, res, next){
    const promise1 = pool.query("SELECT * FROM comment WHERE post_id = ?", [
        req.params.id,
    ]);
  
      Promise.all([promise1])
        .then((results) => {
          const comments = results[0];
          console.log(comments[0])
          res.json({
            comments: comments[0],
            error: null,
          });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
});

// Create new comment
router.post('/:id/comments',isLoggedIn, async function(req, res, next){
    // id -> postId
    // console.log(req.body)
    const comment = req.body.comment;

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    console.log('PostId : ', req.params.id)

    try{
        const [row, field] = await conn.query(
            'INSERT INTO comment(comment_text, user_id, post_id) VALUES(?, ?, ?)',
            [comment,req.user.user_id,req.params.id]
        );

        let commentId = row.insertId

        const [row1, field1] = await conn.query(
            'SELECT * FROM comment WHERE comment_id = ?', [commentId]
        )
        
        await conn.commit();
        console.log(row1[0])
        return res.json(row1[0])
    } catch (err){
        console.log(err)
        await conn.rollback()
    } finally {
        console.log('finally create comment')
        await conn.release()
    }
});


// Delete comment
router.delete('/comments/:commentId',isLoggedIn,commentOwner, async function(req, res, next){
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try{
        const [rows, fields] = await conn.query("DELETE FROM comment WHERE comment_id=?",
        [req.params.commentId])
        await conn.commit();
        return res.json({
            message: "Comment ID " + req.params.commentId + " is deleted."
        })
    } catch (err){
        await conn.rollback();
        return res.status(500).json(err);
    } finally{
        console.log("finally delete comment");
        conn.release();
    }
});

exports.router = router

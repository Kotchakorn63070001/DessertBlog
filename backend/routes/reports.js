const express = require("express");
const pool = require("../config");
const router = express.Router();

// Create new comment
router.post('/:id/comments', async function(req, res, next){
    // id -> postId
    // console.log(req.body)
    const comment = req.body.comment;

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    console.log('PostId : ', req.params.id)

    try{
        const [row, field] = await conn.query(
            'INSERT INTO comment(comment_text, user_id, post_id) VALUES(?, 1, ?)',
            [comment, req.params.id]
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

exports.router = router;
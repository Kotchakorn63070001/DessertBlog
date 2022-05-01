const express = require("express");
const pool = require("../config");
router = express.Router();



router.get('/', async function(req, res, next){
    try{
        const search = req.query.search || ''
        let sql = 'SELECT * FROM post'
        let cond = []

        if (search.length > 0){
            sql = 'SELECT * FROM post WHERE title LIKE ? OR description LIKE ?;'
            cond = [`%${search}%`, `%${search}%`]
        }

        const [rows, fields] = await pool.query(sql, cond)
        // console.log('rows', rows)
        return res.json(rows);
    } catch (err){
        return res.status(500).json(err)
    }
})


exports.router = router;
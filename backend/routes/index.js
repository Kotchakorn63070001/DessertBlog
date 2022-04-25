const express = require("express");
const pool = require("../config");
router = express.Router();



router.get('/', async function(req, res, next){
    try{
        const [rows, fields] = await pool.query('SELECT * FROM post')
        console.log('rows', rows)
        res.json(rows)
    } catch (err){
        return res.status(500).json(err)
    }
})


exports.router = router;
const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get('/reports', function(req, res, next){
    const promise1 = pool.query("SELECT * FROM report JOIN user USING (user_id)");

      Promise.all([promise1])
        .then((results) => {
          const reports = results[0];
        //   console.log(reports[0])
          res.json({
            reports: reports[0],
            error: null,
          });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
})

router.put("/status/:reportId", async function (req, res) {

    console.log('มาน้า')
    const status = req.body.status
    console.log(status)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
  
    try {

        if (status === '1'){
            console.log('เข้า 1')
            await conn.query('UPDATE report SET status=? WHERE report_id=?', 
            ['pending', req.params.reportId])
        }
        else if (status === '2'){
            console.log('เข้า 2')
            await conn.query('UPDATE report SET status=? WHERE report_id=?', 
            ['complete', req.params.reportId])
        }
        
        const [rows, fields] = await conn.query("SELECT * FROM report WHERE report_id=?",
                                [req.params.reportId])
                                // console.log(rows[0].status)

        conn.commit()
        res.json({ status: rows[0].status})
        // res.json({ message: "Update status report id " + req.params.reportId + " Complete" })
    } catch (error) {
        console.log(error)
        await conn.rollback()
    } finally {
        console.log('finally update status report')
        conn.release();
    }
});

// Create new report post
router.post('/create/report/post/:postId', async function(req, res, next){
    const titleReport = req.body.titleReport;
    console.log('title post : ', titleReport)
    const textReport = req.body.textReport;
    console.log('text post : ', textReport)

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    console.log('PostId : ', req.params.postId)

    try{
        const [row, field] = await conn.query(
            'INSERT INTO report(report_title, report_text, status, user_id, post_id) VALUES(?, ?, ?, ?, ?)',
            [titleReport, textReport, 'pending', 1, req.params.postId]
        );

        let reportId = row.insertId

        const [row1, field1] = await conn.query(
            'SELECT * FROM report WHERE report_id = ?', [reportId]
        )
        
        await conn.commit();
        console.log(row1[0])
        return res.json(row1[0])
    } catch (err){
        console.log(err)
        await conn.rollback()
    } finally {
        console.log('finally create report post')
        await conn.release()
    }
});

// Create new report comment
router.post('/create/report/comment/:commentId', async function(req, res, next){
    const titleReport = req.body.titleReport;
    console.log('title comment : ', titleReport)
    const textReport = req.body.textReport;
    console.log('text comment : ', textReport)

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    console.log('PostId : ', req.params.commentId)

    try{
        const [row, field] = await conn.query(
            'INSERT INTO report(report_title, report_text, status, user_id, comment_id) VALUES(?, ?, ?, ?, ?)',
            [titleReport, textReport, 'pending', 1, req.params.commentId]
        );

        let reportId = row.insertId

        const [row1, field1] = await conn.query(
            'SELECT * FROM report WHERE report_id = ?', [reportId]
        )
        
        await conn.commit();
        console.log(row1[0])
        return res.json(row1[0])
    } catch (err){
        console.log(err)
        await conn.rollback()
    } finally {
        console.log('finally create report comment')
        await conn.release()
    }
});




exports.router = router;
const express = require("express");
const multer = require("multer");
const path = require("path")
const pool = require("../config");
const fs = require("fs");

const { isLoggedIn } = require('../middlewares')

const postOwner = async (req, res, next) => {
  if (req.user.role === 'admin') {
    return next()
  }
  
  const [[post]] = await pool.query('SELECT * FROM post WHERE user_id=?', [req.params.id])

  if (post.user_id !== req.user.id) {
    return res.status(403).send('You do not have permission to perform this action')
  }

  next()
}


// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router = express.Router();



// router.get('/create', async function(req, res, next){
//     res.render('create')
//     // res.send('Hello World!')
// })

router.post('/create', isLoggedIn, upload.array("moreImages"), async function(req, res, next){
    
    const title = req.body.title;
    const description = req.body.description;
    const postTypeId = req.body.typeDessert;
    const files = req.files;

    if (!files) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    let ingreArray = [];
    let methodArray = [];
    let imgArray = [];

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try{
        var main = files[0]

        const [rows, fields] = await conn.query(
            'INSERT INTO post(title, date, img, description, user_id, post_type_id) VALUES(?, CURRENT_TIMESTAMP, ?, ? ,?, ?)',
            [title, main.path.substring(6), description, 1, postTypeId]
        )
        let postId = rows.insertId;

        const [rows1, fields1] = await conn.query(
          'INSERT INTO content(post_id) VALUES(?)',
          [postId]
        )
        let contentId = rows1.insertId;
        console.log('content_id = ', contentId)


        // console.log(req.body.ingredient)
        // console.log('length : ', req.body.ingredient.length)
        // if (req.body.ingredient.length > 1){
          req.body.ingredient.forEach((item) => {
            let ingre = [contentId, item];
            ingreArray.push(ingre);
          });

          await conn.query(
            "INSERT INTO content_ingredient(content_id, ingredient) VALUES ?",
            [ingreArray]
          );
        // }
        // else{
          // await conn.query(
          //   "INSERT INTO content_ingredient(content_id, ingredient) VALUES ?",
          //   [req.body.ingredient, contentId]
          // )
        // }

        // console.log('Ingredient Array :', ingreArray)

        req.body.methodCook.forEach((item) => {
          let method = [contentId, item]
          methodArray.push(method)
        })

        console.log(files)
        console.log('type of file : ',Array.isArray(files))

        // if (files.length > 0)
        req.files.forEach((files, index) => {
          if (index !== 0){
            let image = [contentId, files.path.substring(6)]
            imgArray.push(image)
          }
        })
        // console.log('Img Array :', imgArray)



        await conn.query(
          "INSERT INTO content_cooking_method(content_id, cooking_method) VALUES ?",
          [methodArray]
        );

        await conn.query(
          "INSERT INTO content_image(content_id, image) VALUES ?",
          [imgArray]
        );

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
router.put("/posts/addlike/:postId", isLoggedIn, async function (req, res, next) {
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
  
router.get("/posts/:id",isLoggedIn, function (req, res, next) {
    const promise1 = pool.query("SELECT * FROM post JOIN content USING (post_id) WHERE post_id=?", [
      req.params.id,
    ]);
    const promise2 = pool.query("SELECT ingredient FROM content JOIN content_ingredient USING (content_id) WHERE post_id=?", [
      req.params.id,
    ]);
    const promise3 = pool.query("SELECT cooking_method FROM content JOIN content_cooking_method USING (content_id) WHERE post_id=?", [
      req.params.id,
    ]);
    const promise4 = pool.query("SELECT image FROM content JOIN content_image USING (content_id) WHERE post_id=?", [
      req.params.id,
    ]);
    const promise5 = pool.query("SELECT * FROM comment WHERE post_id=?", [
      req.params.id,
    ]);

    Promise.all([promise1, promise2, promise3, promise4, promise5])
      .then((results) => {
        const posts = results[0];
        const ingredients = results[1];
        const methods = results[2];
        const images = results[3];
        const comments = results[4];
        console.log(posts[0][0])
        console.log(ingredients[0])
        console.log(images[0])
        res.json({
          posts: posts[0][0],
          ingredients: ingredients[0],
          methods: methods[0],
          images: images[0],
          comments: comments[0],
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
        return res.status(500).json(err);
      });
});

// เพิ่มยอดวิว
router.put("/posts/addview/:postId", isLoggedIn,async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try{
      const [rows, fields] = await pool.query("SELECT * FROM post WHERE post_id=?", [
        req.params.postId,
      ]);
      let viewNum = rows[0].num_view
      viewNum += 1

      await pool.query("UPDATE post SET post.num_view=? WHERE post_id=?", [
        viewNum, req.params.postId,
      ]);

      await conn.commit();
      res.json({ view: viewNum });
  } catch (err) {
      await conn.rollback();
      return res.status(500).json(err);
  } finally {
      console.log("finally add view post");
      conn.release();
  }
})

// Edit Post
router.put("/posts/update/:id",isLoggedIn,postOwner, upload.array("newImage"),async function (req, res) {
  
  const title = req.body.title;
  console.log('title : ', title)
  const description = req.body.description;
  console.log('description: ', description)
  const postTypeId = req.body.typeDessert;
  console.log('post_type_id : ',postTypeId)
  const files = req.files;

  if (!files) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    next(error);
  }

  let ingreArray = [];
  let methodArray = [];
  let oldImgArray = [];
  let imgArray = [];

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {

      await conn.query('UPDATE post SET title=?,  description=?, post_type_id=? WHERE post_id=?', 
      [title,  description, postTypeId, req.params.id])

      const [row, field] = await conn.query('SELECT * FROM content WHERE post_id=?', [req.params.id])
      var contentId = row[0].content_id
    // console.log(contentId)


    req.body.ingredient.forEach((item) => {
      console.log('item ingre : ', item)
      let ingre = item;
      ingreArray.push(ingre);
    });
    // console.log('Ingredient Array :', ingreArray)
    // console.log(req.body.methodCook)
    req.body.methodCook.forEach((item) => {
      console.log('item method : ', item)
      let method = item
      methodArray.push(method)
    })
    
   
    if (req.body.oldImg !== undefined){
      req.body.oldImg.forEach((item) => {
        console.log('item oldImg : ', item)
        let oldImg = item
        oldImgArray.push(oldImg)
      })
      console.log('OldImg Array :', oldImgArray)
    }


    //// update cooking_ingre ////
    const [row1, field1] = await conn.query('SELECT count(*) num_ingre FROM content_ingredient where content_id = ?;', [contentId])
    var num_ingre = row1[0].num_ingre
    console.log('num_ingre : ', num_ingre)

    // กรณีที่ส่วนผสมเดิมใน db มัน < ที่แก้ไข
    if (num_ingre < ingreArray.length){
      // let numInsert = ingreArray.length - num_ingre
      for(let i=0; i<num_ingre; i++){
        await conn.query(
          "UPDATE content_ingredient SET ingredient=? WHERE content_id=?",
          [ingreArray[i], contentId]);
      }
      for(let i=num_ingre; i<ingreArray.length; i++){
        await conn.query(
          "INSERT INTO content_ingredient(content_id, ingredient) VALUES (?, ?)",
          [contentId, ingreArray[i]]);
      }
    }
    // กรณีที่ส่วนผสมเดิมใน db มัน > ที่แก้ไข
    else if(num_ingre > ingreArray.length){
      await conn.query('DELETE FROM content_ingredient WHERE content_id = ?', [contentId])
      for(let i=0; i<ingreArray.length; i++){
        await conn.query(
          "INSERT INTO content_ingredient(content_id, ingredient) VALUES (?, ?)",
          [contentId, ingreArray[i]]);
      }
    }
    else if(num_ingre === ingreArray.length){
      await conn.query('DELETE FROM content_ingredient WHERE content_id = ?', [contentId])
      for(let i=0; i<ingreArray.length; i++){
        await conn.query(
          "INSERT INTO content_ingredient(content_id, ingredient) VALUES (?, ?)",
          [contentId, ingreArray[i]]);
      }
    }
    
    //// update cooking_method ////
    const [row2, field2] = await conn.query('SELECT count(*) num_method FROM content_cooking_method where content_id = ?;', [contentId])
    var num_method = row2[0].num_method
    console.log('num_method : ',num_method)

    // กรณีที่วิธีทำเดิมใน db มัน < ที่แก้ไข
    if (num_method < methodArray.length){
      // let numInsert = methodArray.length - num_method
      for(let i=0; i<num_method; i++){
        await conn.query(
          "UPDATE content_cooking_method SET cooking_method=? WHERE content_id=?",
          [methodArray[i], contentId]);
      }
      for(let i=num_method; i<methodArray.length; i++){
        await conn.query(
          "INSERT INTO content_cooking_method(content_id, cooking_method) VALUES (?, ?)",
          [contentId, methodArray[i]]);
      }
    }
    // กรณีที่วิธีทำเดิมใน db มัน > ที่แก้ไข
    else if(num_method > methodArray.length){
      await conn.query('DELETE FROM content_cooking_method WHERE content_id = ?', [contentId])
      for(let i=0; i<methodArray.length; i++){
        await conn.query(
          "INSERT INTO content_cooking_method(content_id, cooking_method) VALUES (?, ?)",
          [contentId, methodArray[i]]);
      }
    }
    else if(num_method === methodArray.length){
      await conn.query('DELETE FROM content_cooking_method WHERE content_id = ?', [contentId])
      for(let i=0; i<methodArray.length; i++){
        await conn.query(
          "INSERT INTO content_cooking_method(content_id, cooking_method) VALUES (?, ?)",
          [contentId, methodArray[i]]);
      }
    }

        //// update img ////
        const [row3, field3] = await conn.query('SELECT count(*) num_img FROM content_image where content_id = ?;', [contentId])
        var num_img = row3[0].num_img
        console.log('num_img : ',num_img)
    
        // กรณีที่รูปเดิมใน db มัน < ที่แก้ไข
        if (num_img < oldImgArray.length-1){
          await conn.query('UPDATE post SET img=? WHERE post_id=?', 
          [oldImgArray[0], req.params.id])

          for(let i=1; i<=num_img; i++){
            await conn.query(
              "UPDATE content_image SET image=? WHERE content_id=?",
              [oldImgArray[i], contentId]);
          }
          for(let i=num_img; i<oldImgArray.length; i++){
            await conn.query(
              "INSERT INTO content_image(content_id, image) VALUES (?, ?)",
              [contentId, oldImgArray[i]]);
          }
        }
        // กรณีที่รูปเดิมใน db มัน > ที่แก้ไข
        else if(num_img > oldImgArray.length-1){
          await conn.query('UPDATE post SET img=? WHERE post_id=?', 
          [oldImgArray[0], req.params.id])

          await conn.query('DELETE FROM content_image WHERE content_id = ?', [contentId])
          for(let i=1; i<oldImgArray.length; i++){
            await conn.query(
              "INSERT INTO content_image(content_id, image) VALUES (?, ?)",
              [contentId, oldImgArray[i]]);
          }
        }
        else if(num_img === oldImgArray.length-1){
          await conn.query('UPDATE post SET img=? WHERE post_id=?', 
          [oldImgArray[0], req.params.id])

          await conn.query('DELETE FROM content_image WHERE content_id = ?', [contentId])
          for(let i=1; i<oldImgArray.length; i++){
            await conn.query(
              "INSERT INTO content_image(content_id, image) VALUES (?, ?)",
              [contentId, oldImgArray[i]]);
          }
        }


    /// check file length ///    
    if (files.length > 0) {
      if (oldImgArray.length > 0){
        req.files.forEach((files, index) => {
          let image = [files.path.substring(6), contentId]
          imgArray.push(image)
        })

        await conn.query(
          "INSERT INTO content_image(image, content_id) VALUES ?",
          [imgArray]
        );
      }
      else{
        var main = files[0]
        const [rows, fields] = await conn.query(
            'UPDATE post SET img = ? WHERE post_id = ?',
            [main.path.substring(6), req.params.id]
        )

        req.files.forEach((files, index) => {
          if (index !== 0){
            let image = [contentId, files.path.substring(6)]
            imgArray.push(image)
          }
        })
        // console.log('Img Array :', imgArray)

        await conn.query(
          "INSERT INTO content_img(content_id, image) VALUES ?",
          [imgArray]
        );
      }
    }
    
      conn.commit()
      res.json({ message: "Update Post id " + req.params.id + " Complete" })
  } catch (error) {
      console.log(error)
      await conn.rollback()
  } finally {
      console.log('finally update post')
      conn.release();
  }
});


//  Delete Post
router.delete("/posts/:postId",isLoggedIn,postOwner, async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
        await conn.query('DELETE FROM post WHERE post_id=?', [req.params.postId])
        await conn.commit();
        res.json({ message: "Delete Post id " + req.params.postId + " Complete" })
  } catch (err) {
        console.log(err)
        await conn.rollback();
        // return res.status(500).json(err);
  } finally {
        console.log('Filnally Delete Post')
        conn.release();
  }
});

exports.router = router;

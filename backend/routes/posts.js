const express = require("express");
const multer = require("multer");
const path = require("path")
const pool = require("../config");
const fs = require("fs");

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



router.get('/create', async function(req, res, next){
    res.render('create')
    // res.send('Hello World!')
})

router.post('/create',  upload.array("moreImages"), async function(req, res, next){
    const title = req.body.title;
    const description = req.body.description;
    const file = req.file;
    const postTypeId = req.body.typeDessert;
    const files = req.files;

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

        req.body.ingredient.forEach((item) => {
          let ingre = [contentId, item];
          ingreArray.push(ingre);
        });
        // console.log('Ingredient Array :', ingreArray)

        req.body.methodCook.forEach((item) => {
          let method = [contentId, item]
          methodArray.push(method)
        })

        req.files.forEach((files, index) => {
          if (index !== 0){
            let image = [contentId, files.path.substring(6)]
            imgArray.push(image)
          }
          
        })
        // console.log('Img Array :', imgArray)

        await conn.query(
          "INSERT INTO content_ingredient(content_id, ingredient) VALUES ?",
          [ingreArray]
        );

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
    const promise4 = pool.query("SELECT * FROM content JOIN content_image USING (content_id) WHERE post_id=?", [
      req.params.id,
    ]);

    Promise.all([promise1, promise2, promise3, promise4])
      .then((results) => {
        const posts = results[0];
        const ingredients = results[1];
        const methods = results[2];
        const images = results[3]
        console.log(posts[0][0])
        console.log(ingredients[0])
        console.log(images[0])
        res.json({
          posts: posts[0][0],
          ingredients: ingredients[0],
          methods: methods[0],
          images: images[0],
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


// Edit Post
router.put("/posts/:id", async function (req, res) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    const file = req.file;

    if (file) {
      await conn.query(
        "UPDATE images SET file_path=? WHERE id=?",
        [file.path, req.params.id])
    }

    await conn.query('UPDATE blogs SET title=?,content=?, pinned=?, blogs.like=?, create_by_id=? WHERE id=?', [req.body.title, req.body.content, req.body.pinned, req.body.like, null, req.params.id])
    conn.commit()
    res.json({ message: "Update Blog id " + req.params.id + " Complete" })
  } catch (error) {
    await conn.rollback();
    return next(error)
  } finally {
    console.log('finally')
    conn.release();
  }
});


//  Delete Post
router.delete("/posts/:postId", async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();

  try {
    // Check that there is no comments
    const [
      rows1,
      fields1,
    ] = await conn.query(
      "SELECT COUNT(*) FROM `comments` WHERE `blog_id` = ?",
      [req.params.blogId]
    );
    console.log(rows1);

    if (rows1[0]["COUNT(*)"] > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete blogs with comments" });
    }

    //Delete files from the upload folder
    const [
      images,
      imageFields,
    ] = await conn.query(
      "SELECT `file_path` FROM `images` WHERE `blog_id` = ?",
      [req.params.blogId]
    );
    const appDir = path.dirname(require.main.filename); // Get app root directory
    console.log(appDir)
    images.forEach((e) => {
      const p = path.join(appDir, 'static', e.file_path);
      fs.unlinkSync(p);
    });

    // Delete images
    await conn.query("DELETE FROM `images` WHERE `blog_id` = ?", [
      req.params.blogId,
    ]);
    // Delete the selected blog
    const [
      rows2,
      fields2,
    ] = await conn.query("DELETE FROM `blogs` WHERE `id` = ?", [
      req.params.blogId,
    ]);

    if (rows2.affectedRows === 1) {
      await conn.commit();
      res.status(204).send();
    } else {
      throw "Cannot delete the selected blog";
    }
  } catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
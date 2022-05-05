const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
const multer = require("multer");
const path = require("path")


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

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    return value
}
// check username
const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT username FROM user WHERE username = ?", [value])
    if (rows.length > 0) {
        const message = 'username นี้ถูกให้ไปแล้ว กรุณาเปลี่ยนใหม่'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}
// check email
const emailValidator = async (value, helpers) => {
    const [rows1, _] = await pool.query("SELECT email FROM user WHERE email = ?", [value])
    if (rows1.length > 0) {
        const message = 'email นี้ถูกให้ไปแล้ว กรุณาเปลี่ยนใหม่'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}
const signupSchema = Joi.object({
    name: Joi.string().required().max(200),
    password: Joi.string().required().custom(passwordValidator),
    username: Joi.string().required().min(5).max(20).external(usernameValidator),
    email: Joi.string().required().email().external(emailValidator),
})

router.post('/user/register', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5)
    const name = req.body.name
    const email = req.body.email
    // console.log(username)

    try {
        await conn.query(
            'INSERT INTO user(name, username, password,email ) VALUES (?, ?, ?, ?)',
            [name, username, password, email]
        )
        conn.commit()
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }
    const username = req.body.username
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        // Check if username is correct
        const [users] = await conn.query(
            'SELECT * FROM user WHERE username=?', 
            [username]
        )
        const user = users[0]
        if (!user) {    
            throw new Error('Incorrect username')
        }

        // Check if password is correct
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect password')
        }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE user_id=?', 
            [user.user_id]
        )
        let token = tokens[0]?.token
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(user_id, token) VALUES (?, ?)', 
                [user.user_id, token]
            )
        }

        conn.commit()
        res.status(200).json({'token': token})
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})

router.put('/user/update/:userId', isLoggedIn, upload.single("image"), async (req, res, next) => {
    // const name = req.body.name
    // const username = req.body.username
    // const email = req.body.email
    const file = req.file
    // console.log(name)

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {

        await conn.query('UPDATE user SET user_img=? WHERE user_id=?', 
        [file.path.substring(6), req.params.userId])

        const [row, field] = await conn.query(
            'SELECT * FROM user WHERE user_id=?',
            [req.params.userId]
        )

        // console.log(row[0].name)
        conn.commit()
        res.json({user_img: row[0].user_img})
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        console.log('finally edit profile')
        conn.release()
    }
})




exports.router = router

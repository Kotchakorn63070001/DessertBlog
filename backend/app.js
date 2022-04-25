const express = require('express')
var cors = require('cors')
const path = require("path")
const bodyParser = require('body-parser')

const app = express()
app.use(cors())

// Setup static path
app.use(express.static(path.join(__dirname, 'static')))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Encode body
app.use(bodyParser.urlencoded({ extended: false}))

// routers
const indexRouter = require('./routes/index')
const postRouter = require('./routes/posts')
// const commentRouter = require('./routes/comment')

app.use(indexRouter.router)
app.use(postRouter.router)
// app.use(commentRouter.router)



app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
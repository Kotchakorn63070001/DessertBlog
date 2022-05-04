const express = require('express')
var cors = require('cors')
const path = require("path")
const bodyParser = require('body-parser')

const app = express()
app.use(cors())

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Encode body
app.use(bodyParser.urlencoded({ extended: false}))

// routers
const indexRouter = require('./routes/index')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
const reportRouter = require('./routes/reports')

app.use(indexRouter.router)
app.use(postRouter.router)
app.use(commentRouter.router)
app.use(reportRouter.router)


app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
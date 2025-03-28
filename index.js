const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE)

const clientRouters = require("./router/client/index.router");

const app = express()
const port = 3000

// Thiết lập view
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'pug')

// Thiết lập thư mục tĩnh chứa file tĩnh của fontend
app.use(express.static(path.join(__dirname, "public")))

// Thiết lập đường dẫn
app.use ("/", clientRouters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
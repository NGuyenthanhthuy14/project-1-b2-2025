const express = require('express')
const path = require('path')
const database = require("./config/database")
require('dotenv').config();
const adminRouters = require ("./router/admin/index.router")
const clientRouters = require("./router/client/index.router")

const app = express()
const port = 3000

// kết nối database
database.connect();

// Thiết lập view
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'pug')

// Thiết lập thư mục tĩnh chứa file tĩnh của fontend
app.use(express.static(path.join(__dirname, "public")))

// Thiết lập đường dẫn admin
app.use ("/admin", adminRouters)
// Thiết lập đường dẫn client
app.use ("/", clientRouters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
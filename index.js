const express = require('express')
const path = require('path')
const database = require("./config/database")
require('dotenv').config();
const adminRouters = require ("./router/admin/index.router")
const clientRouters = require("./router/client/index.router")
const variableConfig = require("./config/variable")
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')

const app = express()
const port = 3000

// kết nối database
database.connect();

// Thiết lập view
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'pug')

// Thiết lập thư mục tĩnh chứa file tĩnh của fontend
app.use(express.static(path.join(__dirname, "public")))

// Tạo biến toàn cục trong file pug
app.locals.pathAdmin = variableConfig.pathAdmin

// Tạo biến toàn cục trong file bên backend
global.pathAdmin = variableConfig.pathAdmin

// Cho phép gửi data lên dang json
// chuyển từ json => js
app.use(express.json())

// sử dụng cookie-parser
app.use(cookieParser("NGUYENTHANHTHUY")) // Key ngẫu nhiên

// Nhúng flash
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash())

// Thiết lập đường dẫn admin
app.use (`/${variableConfig.pathAdmin}`, adminRouters)
// Thiết lập đường dẫn client
app.use ("/", clientRouters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
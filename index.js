const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE)

const tourController = require("./controllers/clients/tour.controller")
const homeController = require("./controllers/clients/home.controller")

const app = express()
const port = 3000

// Thiết lập view
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'pug')

// Thiết lập thư mục tĩnh chứa file tĩnh của fontend
app.use(express.static(path.join(__dirname, "public")))

app.get('/', homeController.home)

app.get('/tours', tourController.list)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
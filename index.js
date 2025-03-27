const express = require('express')
const path = require('path')

const app = express()
const port = 3000

// Thiết lập view
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'pug')


// Thiết lập thư mục tĩnh chứa file tĩnh của fontend
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
    res.render("client/pages/home", {
        title: "Trang chủ"
    })
})


app.get('/tours', (req, res) => {
    res.render("client/pages/tours-list", {
        title: "Danh sách tours"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thuy0867090536:MUS75p8R98EB36mA@cluster0.svs6hda.mongodb.net/tour-management')

const Tour = mongoose.model('Tour', {
    name: String,
    vehicle: String
}, "");
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


app.get('/tours', async (req, res) => {

    const tourList = await Tour.find({});

    console.log(tourList)

    res.render("client/pages/tours-list", {
        title: "Danh sách tours",
        tourList: tourList,
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
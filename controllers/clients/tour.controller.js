const Tour = require ("../../models/tour.model")

module.exports.list = async (req, res) => {

    const tourList = await Tour.find({});

    console.log(tourList)

    res.render("client/pages/tours-list", {
        title: "Danh sách tours",
        tourList: tourList,
    })
}
// list là hàm


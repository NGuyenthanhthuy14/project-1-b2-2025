module.exports.home = (req, res) => {
    res.render("client/pages/home", {
        title: "Trang chủ"
    })
}
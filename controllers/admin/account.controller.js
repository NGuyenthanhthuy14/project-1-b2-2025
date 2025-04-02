module.exports.login = async (req, res) => {
    res.render("admin/pages/login", {
        title: "Đăng nhập"
    })
}
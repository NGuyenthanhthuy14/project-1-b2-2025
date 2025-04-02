module.exports.login = async (req, res) => {
    res.render("admin/pages/login", {
        title: "Đăng nhập"
    })
}

module.exports.register = (req, res) => {
    res.render("admin/pages/register", {
        title: "Đăng ký"
    }) 
}

module.exports.forgotPassword = (req, res) => {
    res.render("admin/pages/forgot-password", {
        title: "Quên mật khẩu"
    }) 
}

module.exports.otpPassword = (req, res) => {
    res.render("admin/pages/otp-password", {
        title: "Nhập mã OTP"
    }) 
}

module.exports.resetPassword = (req, res) => {
    res.render("admin/pages/reset-password", {
        title: "Đổi mật khẩu"
    }) 
}
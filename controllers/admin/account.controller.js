const AcconutAdmin = require("../../models/account.admin.model")

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

module.exports.registerPost = async(req, res) => {
    // Destructuring: phá vỡ cấu trúc của đối tượng req.body
    const {fullName, email, password} = req.body

    const existAccount = await AcconutAdmin.findOne({
        email: email
    })

    if (existAccount) {
        res.json({
            code: "error",
            message: "Email đã tồn tại trong hệ thống"
        });
        return;
    }

    const newAccount = new AcconutAdmin ({
        fullName: fullName,
        email: email,
        password: password,
        status: "initial"
    })

    await newAccount.save();

    res.json({
        code: "success",
        message: "Đăng ký thành công",
    });
}

module.exports.registerInitial = (req, res) => {
    res.render("admin/pages/register-initial", {
        title: "Tài khoản đã được khởi tạo"
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
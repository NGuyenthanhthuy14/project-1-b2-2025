const AcconutAdmin = require("../../models/account.admin.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    res.render("admin/pages/login", {
        title: "Đăng nhập"
    })
}

module.exports.loginPost = async (req, res) => {
  const {email, password} = req.body;

  const existAccount = await AcconutAdmin.findOne ({
    email: email
  })


  console.log(email)
  console.log(password)

  if (!existAccount) {
    res.json ({
      code: "error",
      message: "Email không tồn tại"
    })
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, existAccount.password);

  if (!isPasswordValid) {
    res.json({
      code: "error",
      message: "Mật khẩu không chính xác!"
    })
    return;
  }

  // Tạo jwt: cho thồn tin mã hoá | và 1 chuỗi bảo mật ngẫu nhiên
  const token = jwt.sign({ 
    id: existAccount.id,
    email: existAccount.email
  }, 
    process.env.JWT_SECRET,
    {
      // Thời gian hết hạn
      expiresIn: '1d' // token có thời gian là 1 ngày
    }
  )

  // Lưu ở trong cookie: thì cả bên frontend và backend đều lấy được
  res.cookie ("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // token có hiệu lực trong 1 ngày
    httpOnly: true,
    sameSite: "strict" // để bảo vệ trống tấn công giả mạo của 1 trang web
  })

  if (existAccount.status != "active"){
    res.json({
      code: "error",
      message: "Tài khoàn chưa được kích hoạt"
    })
    return;
  }



  res.json({
    code: "success",
    message: "Đăng nhập thành công"
  })


}

module.exports.register = (req, res) => {
    res.render("admin/pages/register", {
        title: "Đăng ký"
    }) 
}

module.exports.registerPost = async(req, res) => {
    // Destructuring: phá vỡ cấu trúc của đối tượng req.body. để lấy đối tương từ body
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

    // Mã hoá mật khẩu với bcrypt
    const salt = bcrypt.genSaltSync(10); // chuỗi ngẫu nhiên có 10 ký tự
    const hashedPassword = bcrypt.hashSync(password, salt); // truyền vào chuỗi ngẫu nhiên đấy

    const newAccount = new AcconutAdmin ({
        fullName: fullName,
        email: email,
        password: hashedPassword,
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

module.exports.logoutPost = (req, res) => {
  res.clearCookie("token")
  res.json({
    code: "success",
    message: "Đăng xuất thành công!"
  })
}

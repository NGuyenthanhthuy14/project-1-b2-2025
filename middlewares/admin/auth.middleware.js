const jwt = require('jsonwebtoken');
const AcconutAdmin = require('../../models/account.admin.model');
module.exports.verifyToken = async (req, res, next)=> {
    try {
        const token = req.cookies.token

        // kiểm tra token tồn tại
        if (!token) {
            // chuyển hướng sang trang nào đấy
            res.redirect (`/${pathAdmin}/account/login`)
            return;
        }

        // kiểm tra token có hợp lệ hay k
        // jwt.verify(token, 'shhhhh'): giải mã token gửi lên 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, email} = decoded;

        const exitAccount = await AcconutAdmin.findOne({
            _id: id,
            email: email,
            status: "active"
        })


        if (!exitAccount) {
            res.clearCookie ("token");
            res.redirect (`/${pathAdmin}/account/login`)
            return;
        }

        req.account = exitAccount

        res.locals.account = exitAccount

        next()
    }
    catch (error) {
        res.clearCookie ("token");
        res.redirect (`/${pathAdmin}/account/login`)
    }
}
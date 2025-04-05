const Joi = require('joi');

// joi: là để validate 
module.exports.registerPost = (req, res, next) => {
    /* 
    - schema để định nghĩa ra các trường dữ liệu mà frontend được phép gửi lên. 
    Và cách trường dư liệu đấy có định dạng dữ liệu như nào thì phải gửi đúng như thế thì mới cho gửi lên

    - Trường hợp k đúng sẽ trả ra lỗi
    */
    const schema = Joi.object({
        fullName: Joi.string()
            .required()
            .min(5)
            .max(50)
            .messages({
                // khi string mà trống thì...
                "string.empty": "Vui lòng nhập họ tên",
                "string.min": "Có ít nhất 5 ký tự",
                "string.max": "Có nhiều nhất 50 kí tự"
        }),

        email: Joi.string()
            .required()
            .email()
            .messages({
                // khi string mà trống thì...
                "string.empty": "Vui lòng nhập email",
                "string.email": "Email không đúng định dạng"
        }),

        password: Joi.string()
            .required()
            .min (8)
            // value là giá trị người nhập vào
            // helpers hỗ trợ hàm error
            .custom((value, helpers) => {
                if (!/[A-Z]/.test(value)) {
                    return helpers.error('password.uppercase')
                }
                if (!/[a-z]/.test(value)) {
                    return helpers.error('password.lowercase')
                }
                if (!/\d/.test(value)) {
                    return helpers.error('password.number')
                }
                if (!/[@$!%*?&]/.test(value)) {
                    return helpers.error('password.special')
                }
                // nếu chạy vào nỗi nào return ra lỗi đấy. còn ở đây k có lỗi nào thì return về giá trị của nó để nó chạy tiếp xuống phân khác
                return value;
            })
            .messages({
                // khi string mà trống thì...
                "string.empty": "Vui lòng nhập mật khẩu",
                "string.min": "Có ít nhất 8 ký tự",
                "password.uppercase": "Mật khẩu chứa ít nhất một chữ cái in hoa",
                "password.lowercase": "Mật khẩu chứa ít nhất một chữ cái in thường",
                "password.number": "Mật khẩu chứa ít nhất một chữ số",
                "password.special": "Mật khẩu chứa ít nhất một kí tự đặc biệt",

        }),
    })

    const {error} =schema.validate (req.body);
    if (error) {
        const errorMessage = error.details[0].message;
        res.json ({
            code: "error",
            message: errorMessage
        });

        return;
    }

    next()
}

module.exports.loginPost = (req, res, next) => {
    /* 
    - schema để định nghĩa ra các trường dữ liệu mà frontend được phép gửi lên. 
    Và cách trường dư liệu đấy có định dạng dữ liệu như nào thì phải gửi đúng như thế thì mới cho gửi lên

    - Trường hợp k đúng sẽ trả ra lỗi
    */
    const schema = Joi.object({

        email: Joi.string()
            .required()
            .email()
            .messages({
                // khi string mà trống thì...
                "string.empty": "Vui lòng nhập email",
                "string.email": "Email không đúng định dạng"
        }),

        password: Joi.string()
            .required()
            .min (8)
            // value là giá trị người nhập vào
            // helpers hỗ trợ hàm error
            .custom((value, helpers) => {
                if (!/[A-Z]/.test(value)) {
                    return helpers.error('password.uppercase')
                }
                if (!/[a-z]/.test(value)) {
                    return helpers.error('password.lowercase')
                }
                if (!/\d/.test(value)) {
                    return helpers.error('password.number')
                }
                if (!/[@$!%*?&]/.test(value)) {
                    return helpers.error('password.special')
                }
                // nếu chạy vào nỗi nào return ra lỗi đấy. còn ở đây k có lỗi nào thì return về giá trị của nó để nó chạy tiếp xuống phân khác
                return value;
            })
            .messages({
                // khi string mà trống thì...
                "string.empty": "Vui lòng nhập mật khẩu",
                "string.min": "Có ít nhất 8 ký tự",
                "password.uppercase": "Mật khẩu chứa ít nhất một chữ cái in hoa",
                "password.lowercase": "Mật khẩu chứa ít nhất một chữ cái in thường",
                "password.number": "Mật khẩu chứa ít nhất một chữ số",
                "password.special": "Mật khẩu chứa ít nhất một kí tự đặc biệt",

        }),
    })

    const {error} =schema.validate (req.body);
    if (error) {
        const errorMessage = error.details[0].message;
        res.json ({
            code: "error",
            message: errorMessage
        });

        return;
    }

    next()
}
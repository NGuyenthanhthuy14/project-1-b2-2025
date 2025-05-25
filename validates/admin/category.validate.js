const Joi = require('joi');

// joi: là để validate 
module.exports.createPost = (req, res, next) => {
    /* 
    - schema để định nghĩa ra các trường dữ liệu mà frontend được phép gửi lên. 
    Và cách trường dư liệu đấy có định dạng dữ liệu như nào thì phải gửi đúng như thế thì mới cho gửi lên

    - Trường hợp k đúng sẽ trả ra lỗi
    */
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .messages({
                // khi string mà trống thì...
                "string.empty": "Vui lòng nhập tên danh mục!",
        }),

        parent: Joi.string().allow(""),
        position: Joi.string().allow(""),
        status: Joi.string().allow(""),
        avatar: Joi.string().allow(""),
        description: Joi.string().allow("")
        
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
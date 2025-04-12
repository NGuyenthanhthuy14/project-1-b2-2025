const mongoose = require ('mongoose');
const { Schema } = mongoose

const schema = new Schema (
    {
    email: String,
    otp: String,
    // chỉ định thời gian hết hạn cho bản ghi
    expireAt: {
        type: Date,
        expires: 0
        }
    },
    {
        timestamps: true, // Tự động sinh ra trường createAt va updatedAt
    }
)

const ForgotFassword = mongoose.model('ForgotFassword', schema, 'forgot-password')

module.exports = ForgotFassword
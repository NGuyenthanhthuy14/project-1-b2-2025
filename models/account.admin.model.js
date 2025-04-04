const mongoose = require('mongoose');
const { Schema } = mongoose

const schema = new Schema({
    fullName: String,
    email: String,
    password: String,
    status: String
});

const AcconutAdmin = mongoose.model ('AcconutAdmin', schema, "accounts-admin")

module.exports = AcconutAdmin;
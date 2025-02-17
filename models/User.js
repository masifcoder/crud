const mongoose = require("mongoose");


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name field is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    image: {
        type: String,
        require: false,
        default: 'avatar.jpg'
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin', 'editor'],
        default: 'user'
    }
});


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;


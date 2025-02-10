const mongoose = require("mongoose");
require('dotenv').config();

const postSchema = mongoose.Schema({

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: [10, "Minimum length of title is 10"]
    },
    excerpt: {
        type: String,
        required: [true, "Excerpt is required"]
    },
    content: {
        type: String,
        required: [true, "Content of the post is required"]
    },
    image: {
        type: String,
        required: false,
        default: "post_image.jpg",
        get: (value) => {
            return  process.env.SERVER_URL + value;
        }
    },
    readingTime: {
        type: Number,
        require: true,
        min: [5, "Minimum reading time is 5 mints"],
        max: [25, "Maximum reading time is 25 minutes"],
        default: 5
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
        default: "uncategories"
    }
}, {
    timestamps: true, toJSON: { getters: true },
    toObject: { getters: true },
});


const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;


const mongoose = require("mongoose");


const postSchema = mongoose.Schema({

    authorId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: [10, "Minimum length of title is 10"]
    },
    content: {
        type: String,
        required: [true, "Content of the post is required"]
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
        default: false
    },
    category: {
        type: String,
        required: true,
        default: "uncategories"
    }
});


const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;


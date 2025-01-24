const mongoose = require("mongoose");


// creating schema
const CategorySchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Category name is required"]
    },
    isActive: {
        type: Boolean,
        required: true
    }
});


const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
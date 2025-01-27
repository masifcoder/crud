
const Category = require("../models/Category");

const createCategory = async (req, res) => {

    try {

        const data = req.body;
        const newCat = await Category.create(data);

        return res.status(201).json({
            status: "Ok",
            message: "Successfully created",
            category: newCat
        });

    } catch (error) {
        if (err.name === "ValidationError") {

            const errors = Object.entries(err.errors).map(([field, error]) => ({
                field,
                message: error.message,
            }));

            return res.status(400).json({
                status: "Fail",
                errors: errors
            });

        } else {
            console.error("Unexpected error:", err);
        }
    }

}


const getAllCategories =  async (req, res) => {

    try {
        
        const categories = await Category.find();

        return res.json({
            status: "Ok",
            categories: categories
        });

    } catch (error) {

        console.log(error);
        return res.status(400).json({
            status: "Fail",
            errors: error.message
        });

    }
}


const getCategoryById = async (req, res) => {
    try {

        const id = req.params.id;
        const category = await Category.findById(id);

        return res.json({
            status: "Ok",
            category: category
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "Fail",
            errors: error.message
        });
    }
}

const deleteCategory = async (req, res) => {
    try {

        const id = req.params.id;
        await Category.findByIdAndDelete(id);

        return res.json({
            status: "Ok",
            message: "Successfully deleted"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "Fail",
            errors: error.message
        });
    }
}


const updateCategory = async (req, res) => {
    try {

        const id = req.params.id;
        const data = req.body;
        //const updatedCategory = await Category.findByIdAndUpdate(id, data, {new: true, runValidators: true});

        // Use updateOne (does not return the updated document)
        const updateResult = await Category.updateOne(
            { _id: id },
            { name: 'updateOne' }
        );
        console.log('updateOne result:', updateResult);

        return res.json({
            status: "Ok",
            message: "Successfully updated",
            category: updateResult
        });

    } catch (err) {
        console.log(err);
        if (err.name === "ValidationError") {

            const errors = Object.entries(err.errors).map(([field, error]) => ({
                field,
                message: error.message,
            }));

            return res.status(400).json({
                status: "Fail",
                errors: errors
            });

        } else {
            console.error("Unexpected error:", err);
        }
    }
}


module.exports = {createCategory, getAllCategories, getCategoryById, deleteCategory, updateCategory};



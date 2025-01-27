const express = require("express");

const categoryRouter = express.Router();


const { 
        createCategory, getAllCategories, 
        getCategoryById, deleteCategory , updateCategory
    } = require("../controllers/CategoryController");


// category api
categoryRouter.post("/create", createCategory);

// get all categories
categoryRouter.get("/categories", getAllCategories);

// get single category
categoryRouter.get("/get/:id", getCategoryById);

// delete a category
categoryRouter.delete("/delete/:id", deleteCategory);

// update a category
categoryRouter.put("/update/:id", updateCategory);




module.exports = categoryRouter;
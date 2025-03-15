import Category from "../models/category.js";

// import connectDB from "../db/connection.js";
// connectDB();

async function handleGetAllCategoriesService() {
    try {

        const categories = await Category.find();
        if (!categories) {
            return {
                success: false,
                message: "No Categories Found",
                data: null
            }
        }

        return {
            success: true,
            message: "Categories fetched successfully",
            data: categories
        }

    } catch (error) {
        return {
            success: false,
            message: "Categories fetching failed",
            data: null
        }
    }
}

async function handleGetCategoryByIdService(id) {
    try {

        const category = await Category.findOne({ id });

        if (!category) {
            return {
                success: false,
                message: "Category not found",
                data: null
            }
        }

        return {
            success: true,
            message: "Category fetched successfully",
            data: category
        }


    } catch (error) {
        return {
            success: false,
            message: "Categories fetching failed",
            data: null
        }
    }
}

async function handleCreateCategoryService(name, description, active) {
    try {
        let maximumCategoryId = await Category.find().sort({ id: -1 }).limit(1);

        maximumCategoryId = maximumCategoryId.length > 0 ? parseInt(maximumCategoryId[0].id) : 0;

        const createdCategory = await Category.create({
            id: maximumCategoryId + 1,
            name,
            description,
            active
        })

        if (!createdCategory) {
            return {
                success: false,
                message: "Category creation failed",
                data: null
            }
        }

        return {
            success: true,
            message: "Category created successfully",
            data: createdCategory
        }

    } catch (error) {
        return {
            success: false,
            message: "Category creation failed",
            data: null
        }
    }
}

async function handleUpdateCategoryService(id, name, description, active) {
    try {

        const updatedCategory = await Category.findOneAndUpdate({ id }, {
            name,
            description,
            active
        })

        if (!updatedCategory) {
            return {
                success: false,
                message: "Category update failed",
                data: null
            }
        }

        return {
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        }

    } catch (error) {
        return {
            success: false,
            message: "Categories fetching failed",
            data: null
        }
    }
}

async function handleDeleteCategoryService(id) {
    try {

        const deletedCategory = await Category.findOneAndDelete({ id });

        if (!deletedCategory) {
            return {
                success: false,
                message: "Category deletion failed",
                data: null
            }
        }

        return {
            success: true,
            message: "Category deleted successfully",
            data: deletedCategory
        }

    } catch (error) {
        return {
            success: false,
            message: "Category deletion failed",
            data: null
        }
    }
}

export {
    handleGetAllCategoriesService,
    handleGetCategoryByIdService,
    handleCreateCategoryService,
    handleUpdateCategoryService,
    handleDeleteCategoryService
}
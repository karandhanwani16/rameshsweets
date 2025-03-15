import { handleGetAllCategoriesService, handleGetCategoryByIdService, handleCreateCategoryService, handleUpdateCategoryService, handleDeleteCategoryService } from "../services/category.service.js";

async function handleGetAllCategories(req, res) {
    try {

        const response = await handleGetAllCategoriesService();

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: response.message,
                data: response.data
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: response.data
        })

    } catch (error) {
        res.status(501).json({
            status: "error",
            message: "Internal Server Error",
            data: null
        });
    }
}

async function handleGetCategoryById(req, res) {
    try {
        const { id } = req.params;

        const response = await handleGetCategoryByIdService(id);

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: response.message,
                data: response.data
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: response.data
        })

    } catch (error) {
        res.status(501).json({
            status: "error",
            message: "Internal Server Error",
            data: null
        });
    }
}

async function handleCreateCategory(req, res) {
    try {

        const { name, description, active } = req.body;

        const response = await handleCreateCategoryService(name, description, active);

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: response.message,
                data: response.data
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: response.data
        })

    } catch (error) {
        res.status(501).json({
            status: "error",
            message: "Internal Server Error",
            data: null
        });
    }
}

async function handleUpdateCategory(req, res) {
    try {

        const { id } = req.params;
        const { name, description, active } = req.body;

        const response = await handleUpdateCategoryService(id, name, description, active);

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: response.message,
                data: response.data
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: response.data
        })

    } catch (error) {
        res.status(501).json({
            status: "error",
            message: "Internal Server Error",
            data: null
        });
    }
}

async function handleDeleteCategory(req, res) {
    try {

        const { id } = req.params;

        const response = await handleDeleteCategoryService(id);

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: response.message,
                data: response.data
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: response.data
        })

    } catch (error) {
        res.status(501).json({
            status: "error",
            message: "Internal Server Error",
            data: null
        });
    }
}


export {
    handleGetAllCategories,
    handleGetCategoryById,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory
}
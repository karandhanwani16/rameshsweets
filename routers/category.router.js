import express from "express";
import { handleCreateCategory, handleDeleteCategory, handleGetAllCategories, handleGetCategoryById, handleUpdateCategory } from "../controllers/category.controller.js";
import handleJWTTokenMW from "../middlewares/auth.js";

const router = express.Router();
router.use(handleJWTTokenMW);
router.get("/", handleGetAllCategories)
router.get("/:id", handleGetCategoryById)
router.post("/", handleCreateCategory)
router.put("/:id", handleUpdateCategory)
router.delete("/:id", handleDeleteCategory)


export default router;
import express from "express";
import {
	createPost,
	deletePost,
	getAllPosts,
	getPostById,
} from "../controllers/post.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:postId", getPostById);
router.delete("/:postId", authMiddleware, deletePost);

export default router;

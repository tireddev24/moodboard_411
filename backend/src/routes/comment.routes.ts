import {Router} from "express";
import {
	createComment,
	deleteComment,
	getCommentsForPost,
} from "../controllers/comment.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

// Create a comment on a post
router.post("/:postId/comment", authMiddleware, createComment);

// Get all comments for a specific post
router.get("/:postId/comments", authMiddleware, getCommentsForPost);

// Delete a comment
router.delete("/:postId/:commentId", authMiddleware, deleteComment);

export default router;

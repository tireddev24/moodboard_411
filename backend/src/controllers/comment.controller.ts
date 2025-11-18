import {Request, Response} from "express";
import prisma from "../config/db";
import {sendNotification} from "../utils/sendNotification";

export const createComment = async (req: Request, res: Response) => {
	try {
		const {postId} = req.params;
		const content = req.body!.text;
		const userId = req.user!.userId;

		if (!content || content.trim() === "") {
			return res.status(400).json({message: "Comment cannot be empty."});
		}

		// Ensure post exists
		const post = await prisma.post.findUnique({where: {id: postId}});
		if (!post) {
			return res.status(404).json({message: "Post not found"});
		}

		const comment = await prisma.comment.create({
			data: {
				content,
				postId,
				userId,
			},
		});

		// Send real-time notification to post owner
		if (post.userId !== userId) {
			await sendNotification({
				userId: post.userId,
				type: "COMMENT",
				message: "Someone commented on your post",
				postId,
			});
		}

		return res.status(201).json({
			message: "Comment added successfully",
			comment,
		});
	} catch (error) {
		console.log("COMMENT ERROR:", error);
		return res.status(500).json({message: "Internal server error"});
	}
};

export const getCommentsForPost = async (req: Request, res: Response) => {
	try {
		const {postId} = req.params;

		const comments = await prisma.comment.findMany({
			where: {postId},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						// profileImage: true,
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		return res.status(200).json(comments);
	} catch (error) {
		console.log("GET COMMENTS ERROR:", error);
		return res.status(500).json({message: "Internal server error"});
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	try {
		const {commentId} = req.params;
		const userId = req.user?.userId;

		const comment = await prisma.comment.findUnique({
			where: {id: commentId},
		});

		if (!comment) {
			return res.status(404).json({message: "Comment not found"});
		}

		// Ensure user owns the comment
		if (comment.userId !== userId) {
			return res.status(403).json({message: "Unauthorized"});
		}

		await prisma.comment.delete({
			where: {id: commentId},
		});

		return res.status(200).json({message: "Comment deleted"});
	} catch (error) {
		console.log("DELETE COMMENT ERROR:", error);
		return res.status(500).json({message: "Internal server error"});
	}
};

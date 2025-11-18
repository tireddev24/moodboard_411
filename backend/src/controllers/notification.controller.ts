import {Request, Response} from "express";
import prisma from "../config/db";

// GET all notifications for logged-in user
export const getUserNotifications = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.userId;

		const notifications = await prisma.notification.findMany({
			where: {userId},
			orderBy: {createdAt: "desc"},
		});

		return res.status(200).json(notifications);
	} catch (error) {
		console.log("GET NOTIFICATIONS ERROR:", error);
		return res.status(500).json({message: "Internal server error"});
	}
};

// MARK a single notification as read
export const markNotificationAsRead = async (req: Request, res: Response) => {
	try {
		const {notificationId} = req.params;
		const userId = req.user?.userId;

		const notification = await prisma.notification.findUnique({
			where: {id: notificationId},
		});

		if (!notification) {
			return res.status(404).json({message: "Notification not found"});
		}

		// Prevent users from modifying others' notifications
		if (notification.userId !== userId) {
			return res.status(403).json({message: "Unauthorized"});
		}

		const updated = await prisma.notification.update({
			where: {id: notificationId},
			data: {isRead: true},
		});

		return res.status(200).json(updated);
	} catch (error) {
		console.log("MARK NOTIFICATION READ ERROR:", error);
		return res.status(500).json({message: "Internal server error"});
	}
};

// MARK ALL user notifications as read
export const markAllAsRead = async (req: Request, res: Response) => {
	try {
		const userId = req.user?.userId;

		await prisma.notification.updateMany({
			where: {userId, isRead: false},
			data: {isRead: true},
		});

		return res
			.status(200)
			.json({message: "All notifications marked as read"});
	} catch (error) {
		console.log("MARK ALL READ ERROR:", error);
		return res.status(500).json({message: "Internal server error"});
	}
};

// DELETE a notification
export const deleteNotification = async (req: Request, res: Response) => {
	try {
		const {notificationId} = req.params;
		const userId = req.user?.userId;

		const notification = await prisma.notification.findUnique({
			where: {id: notificationId},
		});

		if (!notification) {
			return res.status(404).json({message: "Notification not found"});
		}

		if (notification.userId !== userId) {
			return res.status(403).json({message: "Unauthorized"});
		}

		await prisma.notification.delete({
			where: {id: notificationId},
		});

		return res.status(200).json({message: "Notification deleted"});
	} catch (error) {
		console.log("DELETE NOTIFICATION ERROR:", error);
		return res.status(500).json({message: "Internal server error"});
	}
};

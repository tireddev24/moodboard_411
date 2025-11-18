import {Router} from "express";
import {
	deleteNotification,
	getUserNotifications,
	markAllAsRead,
	markNotificationAsRead,
} from "../controllers/notification.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

// Get all notifications for the authenticated user
router.get("/", authMiddleware, getUserNotifications);

// Mark a single notification as read
router.patch("/:notificationId/read", authMiddleware, markNotificationAsRead);

// Mark all notifications as read
router.patch("/read-all", authMiddleware, markAllAsRead);

// Delete a notification
router.delete("/:notificationId", authMiddleware, deleteNotification);

export default router;

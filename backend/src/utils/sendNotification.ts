import prisma from "../config/db";
import {io} from "../server";

import {NotificationType} from "@prisma/client";

export const sendNotification = async ({
	userId,
	message,
	type,
	postId,
}: {
	userId: string;
	message: string;
	type: NotificationType;
	postId?: string;
}) => {
	// Save to DB

	const notification = await prisma.notification.create({
		data: {
			userId,
			message,
			type,
			postId,
		},
	});

	// Emit to the user's private room
	io.to(userId).emit("new-notification", notification);

	return notification;
};

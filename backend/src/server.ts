import dotenv from "dotenv";
import http from "http";
import {Server} from "socket.io";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

export const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	// The frontend will send the authenticated userId
	socket.on("register", (userId: string) => {
		socket.join(userId); // Join a private room for the user
		console.log(`User ${userId} joined their room`);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

server.listen(5000, () => console.log("Server running on port 5000"));

app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
});

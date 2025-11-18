import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/root.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
	res.send("Welcome to MoodBoard Backend!");
});

export default app;

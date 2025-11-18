import {Router} from "express";
import {
	deleteUsers,
	login,
	refreshAccessToken,
	register,
} from "../controllers/auth.controller";

const authRoutes = Router();
authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh-token", refreshAccessToken);
authRoutes.delete("/delete", deleteUsers);

export default authRoutes;

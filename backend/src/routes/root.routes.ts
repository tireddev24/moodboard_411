import {Router} from "express";
import authRoutes from "./auth.routes";
import commentRoutes from "./comment.routes";
import likeRoutes from "./like.routes";
import notificationRoutes from "./notification.route";
import postRoutes from "./post.routes";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/posts", likeRoutes);
router.use("/posts", commentRoutes);
router.use("/notifications", notificationRoutes);

export default router;

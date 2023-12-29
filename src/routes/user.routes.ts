import { Router } from "express";
import { deleteUser, getAllUsers } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middleware/auth";
const userRouter = Router();

userRouter.get("/users", isAuthenticated, getAllUsers);
userRouter.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
export default userRouter;

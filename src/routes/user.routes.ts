import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  udpateUser,
  updateCredentials,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middleware/auth";
const userRouter = Router();

userRouter.get("/users", isAuthenticated, getAllUsers);
userRouter.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
userRouter.patch("/users/:id", isAuthenticated, isOwner, udpateUser);
userRouter.put("/users/:id", isAuthenticated, isOwner, updateCredentials);
export default userRouter;

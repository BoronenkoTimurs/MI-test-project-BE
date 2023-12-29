import { Router } from "express";
import {
  addPost,
  deletePost,
  getPostByID,
  getPosts,
  updatePost,
} from "../controllers/post";

const postRouter = Router();

// Remove whit lines to another routes file
postRouter.get("/", (req, res) => {
  try {
    res.send("Example homepage! (With router support)");
  } catch (error) {
    console.error(error);
  }
});
postRouter.get("/section", (req, res) => {
  try {
    res.send("Section page! (With router support)");
  } catch (error) {
    console.error(error);
  }
});
postRouter.get("/sub-section", (req, res) => {
  try {
    res.send("Sub-section page! (With router support)");
  } catch (error) {
    console.error(error);
  }
});
// Remove whit lines to another routes file

// Posts <------------------------------------------>
postRouter.get("/posts", getPosts);
postRouter.post("/posts", addPost);
postRouter.get("/posts/:id", getPostByID);
postRouter.delete("/posts/:id", deletePost);
postRouter.put("/posts/:id", updatePost);

export default postRouter;

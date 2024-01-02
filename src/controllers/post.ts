// Here write functions for posts page and use it in exampleRoutes.ts
import { Request, Response } from "express";
import { PostModel } from "../model/postModel";

export const addPost = async (req: Request, res: Response) => {
  try {
    if (!req.body.title || !req.body.content || !req.body.author) {
      return res.status(400).send({
        message: "For creating send all required fields!",
      });
    }
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    };
    const post = await PostModel.create(newPost);

    return res.status(201).send(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error while updating post!` });
  }
};
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find({});
    return res.status(200).json({
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error while showing all posts!` });
  }
};
export const getPostByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ message: `Post with id: ${id} not found!` });
    }
    return res.status(200).json({
      data: post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error while showing post by ID!` });
  }
};
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await PostModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: `Post with id: ${id} not found!`,
      });
    }
    return res.status(200).send({ message: `Post with id: ${id} deleted!` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error while deleting post!` });
  }
};
export const updatePost = async (req: Request, res: Response) => {
  try {
    if (!req.body.title || !req.body.content || !req.body.author) {
      return res.status(400).send({
        message: "For updating send all required fields!",
      });
    }
    const { id } = req.params;

    const result = await PostModel.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res
        .status(404)
        .json({ message: `Post with id: ${id} not found!` });
    }
    return res.status(201).send({ message: `Post with id: ${id} updated!` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Error while updating post!` });
  }
};

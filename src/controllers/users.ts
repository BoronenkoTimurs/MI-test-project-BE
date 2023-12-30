import { NextFunction, Request, Response } from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../model/userModel";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await getUsers();
    return res.status(200).json({ const: allUsers.length, data: allUsers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error with get all users!" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: `Not existing user with id: ${id}` });
    }
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error with delete user!" });
  }
};
export const udpateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({ message: `Not existing username: ${username}` });
    }

    const user = await getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `Not existing user with id: ${id}` });
    }

    user.username = username;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error with update user!" });
  }
};
export const updateCredentials = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const values = req.body;
    // Add error handler for id(maybe) and for credentials
    const updatedUser = await updateUserById(id, values);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `Not existing user with id: ${id}` });
    }
    await updatedUser.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error with update credentials!" });
  }
};

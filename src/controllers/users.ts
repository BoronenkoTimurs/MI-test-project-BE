import { Request, Response } from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../model/userModel";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    const response = {
      count: users.length,
      data: users,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error with get all users!" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id ${id} does not exist` });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      return res
        .status(404)
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
  const { id } = req.params;
  const values = req.body;

  try {
    const user = await updateUserById(id, values);

    if (!user) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating credentials" });
  }
};

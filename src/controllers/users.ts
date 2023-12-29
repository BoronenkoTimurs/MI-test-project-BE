import { Request, Response } from "express";
import { deleteUserById, getUsers } from "../model/userModel";

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
      return res.status(404).json({ message: `Not existing id: ${id}` });
    }
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error with delete user!" });
  }
};

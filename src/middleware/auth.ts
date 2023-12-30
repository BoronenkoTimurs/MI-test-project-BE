import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../model/userModel";
import { RequestWithIdentity } from "../types/app";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["USER-AUTH"];

    if (!sessionToken) {
      return res.status(403).json({ message: "Not exist USER-AUTH!" });
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(403).json({ message: "Not existing user!" });
    }

    merge(req, { identity: existingUser });
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error with authenticated this user!" });
  }
};

export const isOwner = async (
  req: RequestWithIdentity,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const currentUser = req.identity?._id;
    if (!currentUser) {
      return res.status(403).json({ message: "Error!" });
    }
    if (currentUser.toString() !== id) {
      return res.status(403).json({ message: "It's not your user!" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error with owner part!" });
  }
};

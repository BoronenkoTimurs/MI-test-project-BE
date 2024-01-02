import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../model/userModel";
import { authentication, random } from "../utils/utils";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .send({ message: "For registration need all fields!" });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with this email already exist!" });
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).send({ message: "For login need all fields!" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res
        .status(404)
        .send({ message: `User with email: ${email} not exist!` });
    }

    const expectedHash = user.authentication?.salt
      ? authentication(user.authentication.salt, password)
      : null;
    if (!expectedHash || user.authentication?.password !== expectedHash) {
      return res.status(401).send({ message: "Invalid credentials!" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
    res.cookie("USER-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error!" });
  }
};

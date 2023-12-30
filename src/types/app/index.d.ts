import { Request } from "express";

declare interface IPost {
  id: string;
  name: string;
  content: string;
  author: string;
}

declare interface RequestWithIdentity extends Request {
  identity?: {
    _id?: string;
  };
}

declare interface IUser {
  email: string;
  username: string;
}

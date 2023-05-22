import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  userCreator = async (req: Request, res: Response) => {
    const user = await userService.userCreator(req);
    return res.status(201).json(user);
  };

  usersLoader = async (req: Request, res: Response) => {
    const { status, users } = await userService.usersLoader(req);
    return res.status(status).json(users);
  };

  userLoader = async (req: Request, res: Response) => {
    const { status, user } = await userService.userLoader(req);
    return res.status(status).json(user);
  };

  userEditor = async (req: Request, res: Response) => {
    const user = await userService.userEditor(req);
    return res.status(200).json(user);
  };
}

export default new UserController();

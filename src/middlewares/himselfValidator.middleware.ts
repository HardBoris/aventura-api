import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";

const himselfValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser: User = await userRepository.findOne({
    userId: req.decoded.userId,
  });

  if (decodedUser.userId === req.params.id) {
    return next();
  } else {
    return res.status(401).json({
      error: {
        message: "You are not authorized to perform this operation.",
        name: "UnauthorizedUser",
      },
    });
  }
};

export default himselfValidator;

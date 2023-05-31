import { NextFunction, Request, Response } from "express";
import { Company, User } from "../entities";
import { ErrorHandler } from "../errors";
import { companyRepository, userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundUser: User = await userRepository.findOne({
    companyCode: req.body.company,
    userName: req.body.userName,
  });

  if (foundUser) {
    throw new ErrorHandler(409, "User already exists.");
  }

  return next();
};

export default verifyUserExists;

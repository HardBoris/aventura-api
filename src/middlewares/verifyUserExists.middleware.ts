import { NextFunction, Request, Response } from "express";
import { Company } from "../entities";
import { ErrorHandler } from "../errors";
import { companyRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const company: Company = await companyRepository.findOne({
    companyId: req.params.companyId,
  });

  const users = company.users;

  const foundUser = users?.find((item) => item.userName === req.body.userName);

  if (foundUser) {
    throw new ErrorHandler(409, "User already exists.");
  }

  return next();
};

export default verifyUserExists;

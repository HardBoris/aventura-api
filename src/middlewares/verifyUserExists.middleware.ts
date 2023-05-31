/* import { NextFunction, Request, Response } from "express";
import { Company, User } from "../entities";
import { ErrorHandler } from "../errors";
import { companyRepository, userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const company: Company = async ({ params }: Request) => {
    await companyRepository.findOne({
      companyId: params.companyId,
    });
  };

  const foundUser: User = await userRepository.findOne({
    company: {
      code: company.code,
    },
    userName: (req.validated as User).userName
  });

  if (foundUser) {
    throw new ErrorHandler(409, "Email already exists.");
  }

  return next();
};

export default verifyUserExists;
 */

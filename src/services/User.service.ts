import { Request, Response } from "express";
import { User } from "../entities";
import { companyRepository, userRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { userShape } from "../shapes";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

interface ILogin {
  status: number;
  message: object;
}

class UserService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });

    return result;
  };

  userCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const { name, password } = req.body;

    const hashPassword = await hash(password, 10);

    const user: User = await userRepository.save({
      name: name,
      password: hashPassword,
      company: company,
    });

    return await userShape.userCreator.validate(user, {
      stripUnknown: true,
    });
  };

  userLoger = async (req: Request): Promise<ILogin> => {
    const { companyCode, name, password } = req.body;
    const user: User = await userRepository.findOne({
      company: {
        code: companyCode,
      },
      name: name,
    });

    if (!user) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    if (!(await user.comparePwd(password))) {
      return {
        status: 401,
        message: { message: "Invalid credentials" },
      };
    }

    const token: string = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    const company = await companyRepository.findOne({ code: companyCode });

    return {
      status: 200,
      message: { user: user.name, token, company: company.companyId },
    };
  };

  usersLoader = async (req: Request) => {
    const company = await this.Company(req);

    const users: User[] = await userRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      users: users,
    };
  };

  userLoader = async (req: Request) => {
    const company = await this.Company(req);

    const user: User = await userRepository.findOne({
      company: {
        code: company.code,
      },
      userId: req.params.id,
    });

    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      return {
        status: 200,
        user: user,
      };
    }
  };

  userEditor = async (req: Request) => {
    const company = await this.Company(req);

    const user: User = await userRepository.findOne({
      company: {
        code: company.code,
      },
      userId: req.params.id,
    });

    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    }

    const { userName, userPassword } = req.body;

    const updatedUser = await userRepository.save({
      ...user,
      name: userName,
      password: userPassword,
    });

    return userShape.userUpdated.validate(updatedUser, { stripUnknown: true });
  };

  categoryChanger = async (req: Request) => {
    const company = await this.Company(req);

    const user: User = await userRepository.findOne({
      company: {
        code: company.code,
      },
      userId: req.params.id,
    });

    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    }

    const { userCategory } = req.body;

    if (userCategory === "owner") {
      throw new ErrorHandler(401, "Not allowed!");
    }

    const updatedUser = await userRepository.save({
      ...user,
      userCategory: userCategory,
    });

    return userShape.userUpdated.validate(updatedUser, { stripUnknown: true });
  };

  userDeletor = async (req: Request) => {
    const user: User = await userRepository.findOne({
      userId: req.params.id,
    });

    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    }

    await userRepository.delete(req.params.id);

    return {
      status: 200,
      message: "User deleted",
    };
  };
}

export default new UserService();

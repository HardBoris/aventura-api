/* import { Request } from "express";
import { Company, User } from "../entities";
import { companyRepository, userRepository } from "../repositories";
import CompanyShape from "../shapes/Company.shape";
import { ErrorHandler, errorHandler } from "../errors";
import { userShape } from "../shapes";
// import { AssertsShape } from "yup/lib/object";

class UserService {
  userCreator = async (req: Request): Promise<any> => {
    const { companyCode, userName, userPassword } = req.body;

    const user: User = await userRepository.save({
      userName: userName,
      userPassword: userPassword,
      company: companyCode,
    });

    return await userShape.userCreator.validate(user, {
      stripUnknown: true,
    });
  };

  usersLoader = async (req: Request) => {
    const users: User[] = await userRepository.all();

    return {
      status: 200,
      users: users,
    };
  };

  userLoader = async (req: Request) => {
    const user: User = await userRepository.findOne({
      userId: req.params.id,
    });
    return {
      status: 200,
      user: user,
    };
  };

  userEditor = async (req: Request) => {
    const user: User = await userRepository.findOne({
      userId: req.params.id,
    });

    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    }

    const body = req.body;

    if (body.userId) {
      throw new ErrorHandler(400, "Field userId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (
        (body[key] && key === "userName") ||
        key === "userPassword" ||
        key === "userCategory"
      ) {
        user[key] = body[key];
      }
    });

    const updatedUser = await userRepository.save(user);

    return updatedUser;
  };

  userDeletor = async (req: Request) => {
    await userRepository.delete(req.params.id);
    return {
      status: 200,
      message: "User deleted",
    };
  };
}

export default new UserService();
 */

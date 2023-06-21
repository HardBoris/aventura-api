import { Router } from "express";
import { userController } from "../controllers";
import {
  adminValidator,
  himselfValidator,
  tokenValidator,
  verifyUserExists,
} from "../middlewares";

const userRouter = Router();

userRouter.post(
  "/aventura-api/:companyId/users/register",
  tokenValidator,
  adminValidator,
  verifyUserExists,
  userController.userCreator
);

userRouter.post("/aventura-api/login", userController.userLoger);

userRouter.get(
  "/aventura-api/:companyId/users",
  tokenValidator,
  adminValidator,
  userController.usersLoader
);

userRouter.get(
  "/aventura-api/:companyId/users/:id",
  tokenValidator,
  himselfValidator,
  userController.userLoader
);

userRouter.patch(
  "/aventura-api/:companyId/users/:id",
  tokenValidator,
  himselfValidator,
  userController.userEditor
);

userRouter.put(
  "/aventura-api/:companyId/users/:id",
  tokenValidator,
  adminValidator,
  userController.categoryChanger
);

userRouter.delete(
  "/aventura-api/:companyId/users/:id",
  tokenValidator,
  adminValidator,
  userController.userDeletor
);

export default userRouter;

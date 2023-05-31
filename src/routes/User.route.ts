import { Router } from "express";
import { userController } from "../controllers";
import { tokenValidator, verifyUserExists } from "../middlewares";

const userRouter = Router();

userRouter.post(
  "/aventura-api/:companyId/users/register",
  verifyUserExists,
  userController.userCreator
);

userRouter.post("/aventura-api/login", userController.userLoger);

userRouter.get(
  "/aventura-api/:companyId/users",
  tokenValidator,
  userController.usersLoader
);

userRouter.get(
  "/aventura-api/:companyId/users/:id",
  tokenValidator,
  userController.userLoader
);

userRouter.patch(
  "/aventura-api/:companyId/users/:id",
  tokenValidator,
  userController.userEditor
);

export default userRouter;

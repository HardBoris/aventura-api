import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post(
  "/aventura-api/:companyId/users/register",
  userController.userCreator
);

userRouter.post("/aventura-api/login", userController.userLoger);

userRouter.get("/aventura-api/:companyId/users", userController.usersLoader);

userRouter.get("/aventura-api/:companyId/users/:id", userController.userLoader);

userRouter.patch(
  "/aventura-api/:companyId/users/:id",
  userController.userEditor
);

export default userRouter;

import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post("/aventura-api/users/register", userController.userCreator);

userRouter.post("/aventura-api/users/login", userController.userLoger);

userRouter.get("/aventura-api/users", userController.usersLoader);

userRouter.get("/aventura-api/users/:id", userController.userLoader);

userRouter.patch("/aventura-api/users/:id", userController.userEditor);

export default userRouter;

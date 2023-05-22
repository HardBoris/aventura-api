import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post("/aventura-api/users", userController.userCreator);

userRouter.get("/aventura-api/users", userController.usersLoader);

userRouter.get("/aventura-api/users/:id", userController.userLoader);

userRouter.patch("/aventura-api/users/:id", userController.userEditor);

export default userRouter;

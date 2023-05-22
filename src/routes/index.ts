import { Express } from "express";
import companyRouter from "./Company.route";
import userRouter from "./User.route";

const registerRouters = (app: Express): void => {
  app.use(companyRouter);
  app.use(userRouter);
};

export default registerRouters;

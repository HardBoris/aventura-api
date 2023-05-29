import { Express } from "express";
import companyRouter from "./Company.route";
import userRouter from "./User.route";
import supplierRouter from "./Supplier.route";

const registerRouters = (app: Express): void => {
  app.use(companyRouter);
  app.use(userRouter);
  app.use(supplierRouter);
};

export default registerRouters;

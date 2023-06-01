import { Express } from "express";
import companyRouter from "./Company.route";
import userRouter from "./User.route";
import supplierRouter from "./Supplier.route";
import purchaseRouter from "./Purchase.route";

const registerRouters = (app: Express): void => {
  app.use(companyRouter);
  app.use(userRouter);
  app.use(supplierRouter);
  app.use(purchaseRouter);
};

export default registerRouters;

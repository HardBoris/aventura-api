import { Express } from "express";
import companyRouter from "./Company.route";
import userRouter from "./User.route";
import supplierRouter from "./Supplier.route";
import purchaseRouter from "./Purchase.route";
import stuffRouter from "./Stuff.route";
import midiaRouter from "./Midia.route";
import categoryRouter from "./Category.route";
import toolRouter from "./Tool.route";
import purchaseElementRouter from "./PurchaseElement.route";

const registerRouters = (app: Express): void => {
  app.use(companyRouter);
  app.use(userRouter);
  app.use(supplierRouter);
  app.use(purchaseRouter);
  app.use(stuffRouter);
  app.use(midiaRouter);
  app.use(categoryRouter);
  app.use(toolRouter);
  app.use(purchaseElementRouter);
};

export default registerRouters;

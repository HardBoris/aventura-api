import { Express } from "express";
import companyRouter from "./Company.route";
import userRouter from "./User.route";
import partnerRouter from "./Partner.route";
import purchaseRouter from "./Purchase.route";
import stuffRouter from "./Stuff.route";
import midiaRouter from "./Midia.route";
import categoryRouter from "./Category.route";
import toolRouter from "./Tool.route";
import purchaseElementRouter from "./PurchaseElement.route";
import moveRouter from "./Move.route";
import requisitionRouter from "./Requisition.route";
import entryRouter from "./Entry.route";
import orderRouter from "./ServiceOrder.route";

const registerRouters = (app: Express): void => {
  app.use(companyRouter);
  app.use(userRouter);
  app.use(partnerRouter);
  app.use(purchaseRouter);
  app.use(stuffRouter);
  app.use(midiaRouter);
  app.use(categoryRouter);
  app.use(toolRouter);
  app.use(purchaseElementRouter);
  app.use(moveRouter);
  app.use(requisitionRouter);
  app.use(entryRouter);
  app.use(orderRouter);
};

export default registerRouters;

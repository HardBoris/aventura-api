import { Express } from "express";
import companyRouter from "./Company.route";

const registerRouters = (app: Express): void => {
  app.use(companyRouter);
};

export default registerRouters;

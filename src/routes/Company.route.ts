import { Router } from "express";
import { companyController } from "../controllers";

const companyRouter = Router();

companyRouter.post("/aventura-api/companies", companyController.companyCreator);

companyRouter.get("/aventura-api/companies", companyController.companyLoader);

export default companyRouter;

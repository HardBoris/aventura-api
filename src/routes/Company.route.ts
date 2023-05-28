import { Router } from "express";
import { companyController } from "../controllers";

const companyRouter = Router();

companyRouter.post(
  "/aventura-api/companies/register",
  companyController.companyCreator
);

companyRouter.get("/aventura-api/companies", companyController.companiesLoader);

companyRouter.get(
  "/aventura-api/companies/:code",
  companyController.companyLoader
);

companyRouter.patch(
  "/aventura-api/companies/:code",
  companyController.companyEditor
);

export default companyRouter;

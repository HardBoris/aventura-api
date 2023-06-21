import { Router } from "express";
import { companyController } from "../controllers";
import { ownerValidator, tokenValidator } from "../middlewares";

const companyRouter = Router();

companyRouter.post(
  "/aventura-api/companies/register",
  tokenValidator,
  ownerValidator,
  companyController.companyCreator
);

companyRouter.get(
  "/aventura-api/companies",
  tokenValidator,
  ownerValidator,
  companyController.companiesLoader
);

companyRouter.get(
  "/aventura-api/companies/:code",
  tokenValidator,
  ownerValidator,
  companyController.companyLoader
);

companyRouter.patch(
  "/aventura-api/companies/:code",
  tokenValidator,
  ownerValidator,
  companyController.companyEditor
);

export default companyRouter;

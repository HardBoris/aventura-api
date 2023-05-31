import { Router } from "express";
import { supplierController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const supplierRouter = Router();

supplierRouter.post(
  "/aventura-api/:companyId/suppliers/register",
  tokenValidator,
  buyerValidator,
  supplierController.supplierCreator
);

supplierRouter.get(
  "/aventura-api/:companyId/suppliers",
  tokenValidator,
  buyerValidator,
  supplierController.suppliersLoader
);

supplierRouter.get(
  "/aventura-api/:companyId/suppliers/:id",
  tokenValidator,
  buyerValidator,
  supplierController.supplierLoader
);

supplierRouter.patch(
  "/aventura-api/:companyId/suppliers/:id",
  tokenValidator,
  buyerValidator,
  supplierController.supplierEditor
);

supplierRouter.delete(
  "/aventura-api/:companyId/suppliers/:id",
  tokenValidator,
  buyerValidator,
  supplierController.supplierDeletor
);

export default supplierRouter;

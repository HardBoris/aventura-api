import { Router } from "express";
import { supplierController } from "../controllers";

const supplierRouter = Router();

supplierRouter.post(
  "/aventura-api/:companyId/suppliers/register",
  supplierController.supplierCreator
);

supplierRouter.get(
  "/aventura-api/:companyId/suppliers",
  supplierController.suppliersLoader
);

supplierRouter.get(
  "/aventura-api/:companyId/suppliers/:id",
  supplierController.supplierLoader
);

supplierRouter.patch(
  "/aventura-api/:companyId/suppliers/:id",
  supplierController.supplierEditor
);

supplierRouter.delete(
  "/aventura-api/:companyId/suppliers/:id",
  supplierController.supplierDeletor
);

export default supplierRouter;

import { Router } from "express";
import { elementController } from "../controllers";

const elementRouter = Router();

elementRouter.post(
  "/aventura-api/:companyId/elements/register",
  elementController.elementCreator
);
elementRouter.get(
  "/aventura-api/:companyId/elements",
  elementController.elementsLoader
);
elementRouter.get(
  "/aventura-api/:companyId/elements/:elementId",
  elementController.elementLoader
);

elementRouter.patch(
  "/aventura-api/:companyId/elements/:elementId",
  elementController.elementEditor
);

elementRouter.delete(
  "/aventura-api/:companyId/elements/:elementId",
  elementController.elementDeletor
);

export default elementRouter;

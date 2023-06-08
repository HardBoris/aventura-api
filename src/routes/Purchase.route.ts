import { Router } from "express";
import { purchaseController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const purchaseRouter = Router();

purchaseRouter.post(
  "/aventura-api/:companyId/purchases/register",
  tokenValidator,
  buyerValidator,
  purchaseController.purchaseCreator
);

purchaseRouter.get(
  "/aventura-api/:companyId/purchases",
  tokenValidator,
  buyerValidator,
  purchaseController.purchasesLoader
);

purchaseRouter.get(
  "/aventura-api/:companyId/purchases/:id",
  tokenValidator,
  buyerValidator,
  purchaseController.purchaseLoader
);

purchaseRouter.patch(
  "/aventura-api/:companyId/purchases/:id",
  tokenValidator,
  buyerValidator,
  purchaseController.purchaseEditor
);

purchaseRouter.delete(
  "/aventura-api/:companyId/purchases/:id",
  tokenValidator,
  buyerValidator,
  purchaseController.purchaseDeletor
);

export default purchaseRouter;

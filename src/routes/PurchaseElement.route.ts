import { Router } from "express";
import { purchaseElementController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const purchaseElementRouter = Router();

purchaseElementRouter.post(
  "/aventura-api/:companyId/details/register",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementCreator
);

purchaseElementRouter.get(
  "/aventura-api/:companyId/details",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementsLoader
);

purchaseElementRouter.get(
  "/aventura-api/:companyId/details/:elementId",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementLoader
);

purchaseElementRouter.patch(
  "/aventura-api/:companyId/details/:elementId",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementEditor
);

purchaseElementRouter.delete(
  "/aventura-api/:companyId/details/:elementId",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementDeletor
);

export default purchaseElementRouter;

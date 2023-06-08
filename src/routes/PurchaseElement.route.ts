import { Router } from "express";
import { purchaseElementController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const purchaseElementRouter = Router();

purchaseElementRouter.post(
  "/aventura-api/:companyId/midias/register",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementCreator
);

purchaseElementRouter.get(
  "/aventura-api/:companyId/midias",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementsLoader
);

purchaseElementRouter.get(
  "/aventura-api/:companyId/midias/:elementId",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementLoader
);

purchaseElementRouter.patch(
  "/aventura-api/:companyId/midias/:elementId",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementEditor
);

purchaseElementRouter.delete(
  "/aventura-api/:companyId/midias/:elementId",
  tokenValidator,
  buyerValidator,
  purchaseElementController.purchaseElementDeletor
);

export default purchaseElementRouter;

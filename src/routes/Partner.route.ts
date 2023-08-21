import { Router } from "express";
import { partnerController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const partnerRouter = Router();

partnerRouter.post(
  "/aventura-api/:companyId/partners/register",
  tokenValidator,
  buyerValidator,
  partnerController.partnerCreator
);

partnerRouter.get(
  "/aventura-api/:companyId/partners",
  tokenValidator,
  buyerValidator,
  partnerController.partnersLoader
);

partnerRouter.get(
  "/aventura-api/:companyId/partners/:partnerId",
  tokenValidator,
  buyerValidator,
  partnerController.partnerLoader
);

partnerRouter.patch(
  "/aventura-api/:companyId/partners/:partnerId",
  tokenValidator,
  buyerValidator,
  partnerController.partnerEditor
);

partnerRouter.delete(
  "/aventura-api/:companyId/partners/:partnerId",
  tokenValidator,
  buyerValidator,
  partnerController.partnerDeletor
);

export default partnerRouter;

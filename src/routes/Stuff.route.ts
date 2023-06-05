import { Router } from "express";
import { stuffController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const stuffRouter = Router();

stuffRouter.post(
  "/aventura-api/:companyId/stuffs/register",
  tokenValidator,
  buyerValidator,
  stuffController.stuffCreator
);

stuffRouter.get(
  "/aventura-api/:companyId/stuffs",
  tokenValidator,
  buyerValidator,
  stuffController.stuffsLoader
);

stuffRouter.get(
  "/aventura-api/:companyId/stuffs/:stuffId",
  tokenValidator,
  buyerValidator,
  stuffController.stuffLoader
);

stuffRouter.patch(
  "/aventura-api/:companyId/stuffs/:stuffId",
  tokenValidator,
  buyerValidator,
  stuffController.stuffEditor
);

stuffRouter.delete(
  "/aventura-api/:companyId/stuffs/:stuffId",
  tokenValidator,
  buyerValidator,
  stuffController.stuffDeletor
);

export default stuffRouter;

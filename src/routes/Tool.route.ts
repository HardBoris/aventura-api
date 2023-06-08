import { Router } from "express";
import { toolController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const toolRouter = Router();

toolRouter.post(
  "/aventura-api/:companyId/tools/register",
  tokenValidator,
  buyerValidator,
  toolController.toolCreator
);

toolRouter.get(
  "/aventura-api/:companyId/tools",
  tokenValidator,
  buyerValidator,
  toolController.toolsLoader
);

toolRouter.get(
  "/aventura-api/:companyId/tools/:toolId",
  tokenValidator,
  buyerValidator,
  toolController.toolLoader
);

toolRouter.patch(
  "/aventura-api/:companyId/tools/:toolId",
  tokenValidator,
  buyerValidator,
  toolController.toolEditor
);

toolRouter.delete(
  "/aventura-api/:companyId/tools/:toolId",
  tokenValidator,
  buyerValidator,
  toolController.toolDeletor
);

export default toolRouter;

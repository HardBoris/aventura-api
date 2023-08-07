import { Router } from "express";
import { requisitionController } from "../controllers";

const requisitionRouter = Router();

requisitionRouter.post(
  "/aventura-api/:companyId/requisitions/register",
  requisitionController.requisitionCreator
);
requisitionRouter.get(
  "/aventura-api/:companyId/requisitions",
  requisitionController.requisitionsLoader
);
requisitionRouter.get(
  "/aventura-api/:companyId/requisitions/:requestId",
  requisitionController.requisitionLoader
);

requisitionRouter.patch(
  "/aventura-api/:companyId/requisitions/:requestId",
  requisitionController.reqEditor
);

requisitionRouter.delete(
  "/aventura-api/:companyId/requisitions/:requestId",
  requisitionController.requisitionDeletor
);

export default requisitionRouter;

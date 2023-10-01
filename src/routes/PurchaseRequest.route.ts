import { Router } from "express";
import { prequestController } from "../controllers";

const prequestRouter = Router();

prequestRouter.post(
  "/aventura-api/:companyId/prequests/register",
  prequestController.prequestCreator
);
prequestRouter.get(
  "/aventura-api/:companyId/prequests",
  prequestController.prequestsLoader
);
prequestRouter.get(
  "/aventura-api/:companyId/prequests/:prequestId",
  prequestController.prequestLoader
);

prequestRouter.patch(
  "/aventura-api/:companyId/prequests/:prequestId",
  prequestController.prequestEditor
);

prequestRouter.delete(
  "/aventura-api/:companyId/prequests/:prequestId",
  prequestController.prequestDeletor
);

export default prequestRouter;

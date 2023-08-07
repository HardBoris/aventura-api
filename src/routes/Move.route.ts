import { Router } from "express";
import { moveController } from "../controllers";

const moveRouter = Router();

moveRouter.post(
  "/aventura-api/:companyId/movements/register",
  moveController.moveCreator
);
moveRouter.get(
  "/aventura-api/:companyId/movements",
  moveController.movementsLoader
);
moveRouter.get(
  "/aventura-api/:companyId/movements/:moveId",
  moveController.moveLoader
);
moveRouter.get(
  "/aventura-api/:companyId/movements/req/:requisitionId",
  moveController.selectedLoader
);
moveRouter.patch(
  "/aventura-api/:companyId/movements/:moveId",
  moveController.moveEditor
);
moveRouter.delete(
  "/aventura-api/:companyId/movements/:moveId",
  moveController.moveDeletor
);

export default moveRouter;

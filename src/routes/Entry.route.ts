import { Router } from "express";
import { entryController } from "../controllers";

const entryRouter = Router();

entryRouter.post(
  "/aventura-api/:companyId/entries/register",
  entryController.entryCreator
);
entryRouter.get(
  "/aventura-api/:companyId/entries",
  entryController.entriesLoader
);
entryRouter.get(
  "/aventura-api/:companyId/entries/:entryId",
  entryController.entryLoader
);

entryRouter.patch(
  "/aventura-api/:companyId/entries/:entryId",
  entryController.entryEditor
);

entryRouter.delete(
  "/aventura-api/:companyId/entries/:entryId",
  entryController.entryDeletor
);

export default entryRouter;

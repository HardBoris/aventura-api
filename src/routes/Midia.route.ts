import { Router } from "express";
import { midiaController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const midiaRouter = Router();

midiaRouter.post(
  "/aventura-api/:companyId/midias/register",
  tokenValidator,
  buyerValidator,
  midiaController.midiaCreator
);

midiaRouter.get(
  "/aventura-api/:companyId/midias",
  tokenValidator,
  buyerValidator,
  midiaController.midiasLoader
);

midiaRouter.get(
  "/aventura-api/:companyId/midias/:midiaId",
  tokenValidator,
  buyerValidator,
  midiaController.midiaLoader
);

midiaRouter.patch(
  "/aventura-api/:companyId/midias/:midiaId",
  tokenValidator,
  buyerValidator,
  midiaController.midiaEditor
);

midiaRouter.delete(
  "/aventura-api/:companyId/midias/:midiaId",
  tokenValidator,
  buyerValidator,
  midiaController.midiaDeletor
);

export default midiaRouter;

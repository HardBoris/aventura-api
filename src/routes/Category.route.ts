import { Router } from "express";
import { categoryController } from "../controllers";
import { buyerValidator, tokenValidator } from "../middlewares";

const categoryRouter = Router();

categoryRouter.post(
  "/aventura-api/:companyId/categories/register",
  tokenValidator,
  buyerValidator,
  categoryController.categoryCreator
);

categoryRouter.get(
  "/aventura-api/:companyId/categories",
  tokenValidator,
  buyerValidator,
  categoryController.categoriesLoader
);

categoryRouter.get(
  "/aventura-api/:companyId/categories/:categoryId",
  tokenValidator,
  buyerValidator,
  categoryController.categoryLoader
);

categoryRouter.patch(
  "/aventura-api/:companyId/categories/:categoryId",
  tokenValidator,
  buyerValidator,
  categoryController.categoryEditor
);

categoryRouter.delete(
  "/aventura-api/:companyId/categories/:categoryId",
  tokenValidator,
  buyerValidator,
  categoryController.categoryDeletor
);

export default categoryRouter;

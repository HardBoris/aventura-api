import { Router } from "express";
import { serviceOrderController } from "../controllers";
import { tokenValidator } from "../middlewares";

const orderRouter = Router();

orderRouter.post(
  "/aventura-api/:companyId/service_orders/register",
  tokenValidator,
  serviceOrderController.ServiceOrderCreator
);

orderRouter.get(
  "/aventura-api/:companyId/service_orders",
  tokenValidator,
  serviceOrderController.OrderListLoader
);

orderRouter.get(
  "/aventura-api/:companyId/service_orders/:orderId",
  tokenValidator,
  serviceOrderController.ServiceOrderLoader
);

orderRouter.patch(
  "/aventura-api/:companyId/service_orders/:orderId",
  tokenValidator,
  serviceOrderController.ServiceOrderEditor
);

orderRouter.delete(
  "/aventura-api/:companyId/service_orders/:orderId",
  tokenValidator,
  serviceOrderController.ServiceOrderDeletor
);

export default orderRouter;

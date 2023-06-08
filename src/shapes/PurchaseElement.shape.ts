import * as yup from "yup";

class PurchaseElementShape {
  purchaseElementCreator = yup.object().shape({
    elementId: yup.string().uuid().required(),
    element: yup.string().required(),
  });
}

export default new PurchaseElementShape();

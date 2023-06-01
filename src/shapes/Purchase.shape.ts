import * as yup from "yup";

class PurchaseShape {
  purchaseCreator = yup.object().shape({
    purchaseId: yup.string().uuid().required(),
    purchaseDate: yup.string().required(),
    purchaseReference: yup.string().required(),
    deliveryDate: yup.string().required(),
    logistigMode: yup.string().required(),
    paymentForm: yup.string().required(),
    paymentInstallments: yup.string().required(),
    purchaseStatus: yup.string().required(),
  });
}

export default new PurchaseShape();

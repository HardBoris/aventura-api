import * as yup from "yup";

class PurchaseShape {
  purchaseCreator = yup.object().shape({
    purchaseId: yup.number().required(),
    purchaseDate: yup.string().required(),
    deliveryDate: yup.string().required(),
    logisticMode: yup.string().required(),
    paymentForm: yup.string().required(),
    paymentInstallments: yup.string().required(),
    purchaseStatus: yup.string().required(),
  });
}

export default new PurchaseShape();

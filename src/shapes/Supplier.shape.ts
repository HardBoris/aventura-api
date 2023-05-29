import * as yup from "yup";

class SupplierShape {
  supplierCreator = yup.object().shape({
    supplierName: yup.string().lowercase().required(),
    supplierCNPJ: yup.string().required(),
  });
}

export default new SupplierShape();

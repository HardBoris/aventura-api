import * as yup from "yup";

class PartnerShape {
  partnerCreator = yup.object().shape({
    fantasyName: yup.string().lowercase().required(),
    CNPJ: yup.string().required(),
  });
}

export default new PartnerShape();

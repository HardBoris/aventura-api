import * as yup from "yup";

class CompanyShape {
  companyCreator = yup.object().shape({
    companyEmail: yup.string().email().lowercase().required(),
    companyCode: yup.string().required(),
  });
}

export default new CompanyShape();

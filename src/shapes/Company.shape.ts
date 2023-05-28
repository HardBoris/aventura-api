import * as yup from "yup";

class CompanyShape {
  companyCreator = yup.object().shape({
    companyName: yup.string().lowercase().required(),
    code: yup.string().required(),
  });
}

export default new CompanyShape();

import * as yup from "yup";

class MidiaShape {
  midiaCreator = yup.object().shape({
    midiaId: yup.string().uuid().required(),
    midiaName: yup.string().required(),
    measurementUnit: yup.string().required(),
  });
}

export default new MidiaShape();

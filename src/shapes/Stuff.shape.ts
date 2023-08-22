import * as yup from "yup";

class StuffShape {
  stuffCreator = yup.object().shape({
    stuffId: yup.string().uuid().required(),
    stuff: yup.string().required(),
    // defaultUnit: yup.string().required(),
  });
}

export default new StuffShape();

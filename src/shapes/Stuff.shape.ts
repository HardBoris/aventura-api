import * as yup from "yup";

class StuffShape {
  stuffCreator = yup.object().shape({
    stuffId: yup.string().uuid().required(),
    stuffName: yup.string().required(),
    measurementUnit: yup.string().required(),
  });
}

export default new StuffShape();

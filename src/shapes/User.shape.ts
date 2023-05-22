import * as yup from "yup";

class UserShape {
  userCreator = yup.object().shape({
    userName: yup.string().lowercase().required(),
  });
}

export default new UserShape();

import * as yup from "yup";

class UserShape {
  userCreator = yup.object().shape({
    userName: yup.string().lowercase().required(),
    company: yup.object().shape({
      code: yup.string().required(),
    }),
  });

  userUpdated = yup.object().shape({
    userName: yup.string().required(),
    userCategory: yup.string().required(),
  });
}

export default new UserShape();

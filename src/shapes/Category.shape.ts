import * as yup from "yup";

class CategoryShape {
  categoryCreator = yup.object().shape({
    categoryId: yup.string().uuid().required(),
    category: yup.string().required(),
  });
}

export default new CategoryShape();

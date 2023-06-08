import * as yup from "yup";

class ToolShape {
  toolCreator = yup.object().shape({
    toolId: yup.string().uuid().required(),
    tool: yup.string().required(),
  });
}

export default new ToolShape();

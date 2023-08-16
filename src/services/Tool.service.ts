import { Request } from "express";
import { Tool } from "../entities";
import { companyRepository, toolRepository } from "../repositories";
import { ErrorHandler } from "../errors";
import { toolShape } from "../shapes";

class ToolService {
  Company = async ({ params }: Request) => {
    const result = await companyRepository.findOne({
      companyId: params.companyId,
    });
    return result;
  };

  toolCreator = async (req: Request): Promise<any> => {
    const company = await this.Company(req);

    const { toolName, supplierId, purchaseId } = req.body;

    const tool: Tool = await toolRepository.save({
      tool: toolName,
      suppliers: supplierId,
      company: company,
    });

    return await toolShape.toolCreator.validate(tool, {
      stripUnknown: true,
    });
  };

  toolsLoader = async (req: Request) => {
    const company = await this.Company(req);

    const tools: Tool[] = await toolRepository.all({
      company: {
        code: company.code,
      },
    });

    return {
      status: 200,
      tools: tools,
    };
  };

  toolLoader = async (req: Request) => {
    const company = await this.Company(req);

    const tool: Tool = await toolRepository.findOne({
      company: {
        code: company.code,
      },
      toolId: req.params.toolId,
    });
    return {
      status: 200,
      tool: tool,
    };
  };

  toolEditor = async (req: Request) => {
    const company = await this.Company(req);

    const tool: Tool = await toolRepository.findOne({
      company: {
        code: company.code,
      },
      toolId: req.params.toolId,
    });

    if (!tool) {
      throw new ErrorHandler(404, "Tool not found!");
    }

    const body = req.body;

    if (body.toolId) {
      throw new ErrorHandler(400, "Field toolId cannot be modified!");
    }

    Object.keys(body).forEach((key) => {
      if (body[key]) {
        tool[key] = body[key];
      }
    });

    const updatedTool = await toolRepository.save(tool);

    return updatedTool;
  };

  toolDeletor = async (req: Request) => {
    await toolRepository.delete(req.params.toolId);
    return {
      status: 200,
      message: "Tool deleted",
    };
  };
}

export default new ToolService();

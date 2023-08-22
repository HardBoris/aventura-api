import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Tool } from "../entities";

interface IToolRepo {
  save: (tool: Partial<Tool>) => Promise<Tool>;
  all: (payload: object) => Promise<Tool[]>;
  findOne: (payload: object) => Promise<Tool>;
  delete: (id: string) => Promise<DeleteResult>;
}

class ToolRepo implements IToolRepo {
  private ormRepo: Repository<Tool>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Tool);
  }

  save = async (tool: Partial<Tool>) => await this.ormRepo.save(tool);
  all = async (payload: object) =>
    await this.ormRepo.find({
      ...payload,
      relations: {
        details: true,
      },
    });
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new ToolRepo();

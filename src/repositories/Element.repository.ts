import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Element } from "../entities";

interface IElementRepo {
  save: (elemento: Partial<Element>) => Promise<Element>;
  all: () => Promise<Element[]>;
  findOne: (payload: object) => Promise<Element>;
  delete: (id: string) => Promise<DeleteResult>;
}

class ElementRepo implements IElementRepo {
  private ormRepo: Repository<Element>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Element);
  }

  save = async (elemento: Partial<Element>) =>
    await this.ormRepo.save(elemento);
  all = async () =>
    await this.ormRepo.find({
      relations: { partners: true, midia: true, stuff: true, tool: true },
    });
  findOne = async (payload: object) =>
    await this.ormRepo.findOneBy({ ...payload });
  delete = async (id: string) => await this.ormRepo.delete(id);
}

export default new ElementRepo();

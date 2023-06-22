import { DeleteResult, Repository } from "typeorm";
import { Company } from "../entities";
import { AppDataSource } from "../data-source";

interface ICompanyRepo {
  save: (company: Partial<Company>) => Promise<Company>;
  all: () => Promise<Company[]>;
  findOne: (payload: object) => Promise<Company>;
  delete: (code: string) => Promise<DeleteResult>;
}

class CompanyRepo implements ICompanyRepo {
  private ormRepo: Repository<Company>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Company);
  }

  save = async (company: Partial<Company>) => await this.ormRepo.save(company);
  all = async () => await this.ormRepo.find();
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
  delete = async (code: string) => {
    return await this.ormRepo.delete(code);
  };
}

export default new CompanyRepo();

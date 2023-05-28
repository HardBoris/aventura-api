import { compare } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Company } from "./index";

export enum UserCategory {
  ADMIN = "admin",
  BUYER = "buyer",
  INVENTORY = "inventory",
  OVERSEER = "overseer",
  USER = "user",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId?: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  userPassword: string;

  @Column({ type: "enum", enum: UserCategory, default: UserCategory.USER })
  userCategory: UserCategory;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne((type) => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;

  /* @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: "companyId" })
  company: Company; */

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.userPassword);
  };
}

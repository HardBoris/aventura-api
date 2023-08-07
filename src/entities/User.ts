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
  OWNER = "owner",
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

  @Column()
  userName: string;

  @Column()
  userPassword: string;

  @Column({ type: "enum", enum: UserCategory, default: UserCategory.USER })
  userCategory: UserCategory;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Company, (company) => company.code)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.userPassword);
  };
}

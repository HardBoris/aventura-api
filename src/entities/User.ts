/* import { compare } from "bcrypt";
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
  OWNER = "owner",
  BUYER = "buyer",
  STORE = "store",
  OVERSEER = "overseer",
  USER = "user",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId?: string;

  @Column({ unique: true })
  userName: string;

  @Column({ nullable: true })
  userEmail?: string;

  @Column()
  userPassword: string;

  @Column({ type: "enum", enum: UserCategory, default: UserCategory.USER })
  userCategory: UserCategory;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ referencedColumnName: "companyCode" })
  company: Company;

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.userPassword);
  };
}
 */

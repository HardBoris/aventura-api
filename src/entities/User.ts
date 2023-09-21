import { compare } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Company, Entry, PurchaseRequest, Requisition } from "./index";

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
  name: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserCategory, default: UserCategory.USER })
  userCategory: UserCategory;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Entry, (entry) => entry.responsivel, {
    cascade: true,
  })
  entries: Entry[];

  @OneToMany(() => Requisition, (requisition) => requisition.requestor, {
    cascade: true,
  })
  requisitions: Requisition[];

  @OneToMany(() => PurchaseRequest, (prequest) => prequest.requestor, {
    cascade: true,
  })
  prequests: PurchaseRequest[];

  @ManyToOne(() => Company, (company) => company.code)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password);
  };
}

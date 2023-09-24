import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  categoryId?: string;

  @Column()
  category: string;

  @ManyToOne((type) => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

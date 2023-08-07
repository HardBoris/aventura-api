import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "./Purchase";
import { Supplier } from "./Supplier";
import { Company } from "./Company";
import { Category } from "./Category";

@Entity("tools")
export class Tool {
  @PrimaryGeneratedColumn("uuid")
  toolId?: string;

  @Column()
  tool: string;

  @Column({ nullable: true })
  toolModel?: string;

  @Column({ nullable: true })
  toolPower?: string;

  @ManyToMany(() => Supplier)
  suppliers: Supplier[];

  @ManyToMany(() => Purchase)
  purchases: Purchase[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

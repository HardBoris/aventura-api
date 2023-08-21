import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Partner } from "./Partner";
import { Company } from "./Company";
import { Category } from "./Category";
import { PurchaseElement } from "./PurchaseElement";

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

  @OneToMany(() => PurchaseElement, (detail) => detail.tool, { cascade: true })
  details: PurchaseElement[];

  @ManyToMany(() => Partner)
  partners: Partner[];

  @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

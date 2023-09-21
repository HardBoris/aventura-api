import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Partner } from "./Partner";
import { Company } from "./Company";
// import { Category } from "./Category";
// import { PurchaseElement } from "./PurchaseElement";
import { Element } from "./Element";

@Entity("tools")
export class Tool {
  @PrimaryGeneratedColumn("uuid")
  toolProfileId?: string;

  /* @Column()
  tool: string; */

  @Column({ nullable: true })
  toolModel?: string;

  @Column({ nullable: true })
  toolPower?: string;

  @OneToOne(() => Element, (element) => element.tool)
  element: Element;

  /* @OneToMany(() => PurchaseElement, (detail) => detail.tool, { cascade: true })
  details: PurchaseElement[]; */

  /* @ManyToMany(() => Partner)
  partners: Partner[]; */

  /* @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category; */

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
// import { Partner } from "./Partner";
import { Company } from "./Company";
// import { Category } from "./Category";
import { PurchaseElement } from "./PurchaseElement";
import { Element } from "./Element";

@Entity("stuffs")
export class Stuff {
  @PrimaryGeneratedColumn("uuid")
  stuffProfileId?: string;

  /* @Column()
  stuff: string; */

  /* @Column({ nullable: true })
  description?: string; */

  /* @Column({ nullable: true })
  defaultUnit?: string; */

  @Column({ nullable: true })
  stuffPacking?: string;

  @Column({ nullable: true })
  stuffPerPacking?: string;

  @Column({ nullable: true })
  minimumStock?: string;

  @Column({ nullable: true })
  idealStock?: string;

  /* @OneToMany(() => PurchaseElement, (detail) => detail.stuff, { cascade: true })
  details: PurchaseElement[]; */

  @OneToOne(() => Element, (element) => element.stuff)
  element: Element;

  /* @ManyToMany(() => Partner)
  partners: Partner[]; */

  /* @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category; */

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

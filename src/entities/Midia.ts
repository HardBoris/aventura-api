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
import { Category } from "./Category";
import { PurchaseElement } from "./PurchaseElement";
import { Element } from "./Element";

@Entity("midias")
export class Midia {
  @PrimaryGeneratedColumn("uuid")
  midiaProfileId?: string;

  /* @Column()
  midiaName: string; */

  /* @Column({ nullable: true })
  midiaDescription?: string; */

  @Column({ nullable: true })
  width?: string;

  @Column({ nullable: true })
  height?: string;

  @Column({ nullable: true })
  thick?: string;

  /* @Column({ nullable: true })
  measurementUnit?: string; */

  @Column({ nullable: true })
  minimumStock?: string;

  @Column({ nullable: true })
  idealStock?: string;

  @OneToOne(() => Element, (element) => element.midia)
  element: Element;

  /* @OneToMany(() => PurchaseElement, (detail) => detail.midia, { cascade: true })
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

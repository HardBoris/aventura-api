import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Partner } from "./Partner";
import { Company } from "./Company";
import { Category } from "./Category";
import { PurchaseElement } from "./PurchaseElement";

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

  @OneToMany(() => PurchaseElement, (detail) => detail.stuff, { cascade: true })
  details: PurchaseElement[];

  /* @ManyToMany(() => Partner)
  partners: Partner[]; */

  /* @ManyToOne(() => Category)
  @JoinColumn({ name: "categoryId" })
  category: Category; */

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;
}

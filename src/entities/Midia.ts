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

@Entity("midias")
export class Midia {
  @PrimaryGeneratedColumn("uuid")
  midiaId?: string;

  @Column()
  midiaName: string;

  @Column({ nullable: true })
  midiaDescription?: string;

  @Column({ nullable: true })
  midiaWidth?: string;

  @Column({ nullable: true })
  midiaHeight?: string;

  @Column({ nullable: true })
  midiaThick?: string;

  @Column()
  measurementUnit: string;

  @Column({ nullable: true })
  minimumStock?: string;

  @Column({ nullable: true })
  idealStock?: string;

  @OneToMany(() => PurchaseElement, (detail) => detail.midia, { cascade: true })
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

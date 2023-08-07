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

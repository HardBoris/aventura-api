import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company, Purchase } from "./index";

@Entity("suppliers")
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  supplierId?: string;

  @Column()
  supplierName: string;

  @Column({ unique: true })
  supplierCNPJ: string;

  @Column({ nullable: true })
  supplierCorporateName?: string;

  @Column({ nullable: true })
  supplierEmail?: string;

  @Column({ nullable: true })
  supplierPhone?: string;

  @ManyToOne((type) => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;

  @OneToMany(() => Purchase, (purchase) => purchase.supplier, { eager: true })
  purchases: Purchase[];
}

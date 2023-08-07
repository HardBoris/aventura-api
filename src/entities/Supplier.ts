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
import { Company, Midia, Purchase, Stuff, Tool } from "./index";

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

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;

  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[];

  @ManyToMany(() => Stuff, (stuff) => stuff.suppliers)
  @JoinTable()
  stuffs: Stuff[];

  @ManyToMany(() => Midia, (midia) => midia.suppliers)
  @JoinTable()
  midias: Midia[];

  @ManyToMany(() => Tool, (tool) => tool.suppliers)
  @JoinTable()
  tools: Tool[];
}

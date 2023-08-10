import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplier } from "./Supplier";
import { Company } from "./Company";
import { Stuff } from "./Stuff";
import { Midia } from "./Midia";
import { Tool } from "./Tool";

export enum PaymentForm {
  BILLED = "Faturado",
  CARD = "Cartão",
  CASH = "Dinheiro",
}

export enum PurchaseStatus {
  OK = "Ok",
  PENDING = "Pendente",
  DELAYED = "Atrasada",
}

export enum LogisticMode {
  DELIVERY = "Entrega",
  WITHDRAW = "Retirada",
}

@Entity("purchases")
export class Purchase {
  @PrimaryGeneratedColumn()
  purchaseId?: number;

  @CreateDateColumn()
  purchaseDate?: Date;

  @Column({ nullable: true })
  invoice?: string;

  @Column({ nullable: true })
  deliveryDate?: Date;

  @Column({ type: "enum", enum: LogisticMode, default: LogisticMode.DELIVERY })
  logisticMode: LogisticMode;

  @Column({ type: "enum", enum: PaymentForm, default: PaymentForm.BILLED })
  paymentForm: PaymentForm;

  @Column({ nullable: true })
  paymentInstallments: string;

  @Column({
    type: "enum",
    enum: PurchaseStatus,
    default: PurchaseStatus.PENDING,
  })
  purchaseStatus: PurchaseStatus;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: "supplierId" })
  supplier: Supplier;

  @ManyToOne(() => Company)
  @JoinColumn({ referencedColumnName: "code" })
  company: Company;

  @ManyToMany(() => Stuff, (stuff) => stuff.purchases)
  @JoinTable()
  stuffs: Stuff[];

  @ManyToMany(() => Midia, (midia) => midia.purchases)
  @JoinTable()
  midias: Midia[];

  @ManyToMany(() => Tool, (tool) => tool.purchases)
  @JoinTable()
  tools: Tool[];
}

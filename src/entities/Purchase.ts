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

export enum Installments {
  ONCE = "1X",
  TWICE = "2X",
  THRICE = "3X",
  PIX = "Pix",
  MONEY = "A Vista",
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
  @PrimaryGeneratedColumn("uuid")
  purchaseId?: string;

  @CreateDateColumn()
  purchaseDate?: Date;

  @Column({ nullable: true })
  purchaseReference?: string;

  @Column()
  deliveryDate?: Date;

  @Column({ type: "enum", enum: LogisticMode, default: LogisticMode.DELIVERY })
  logisticMode: LogisticMode;

  @Column({ type: "enum", enum: PaymentForm, default: PaymentForm.BILLED })
  paymentForm: PaymentForm;

  @Column({ type: "enum", enum: Installments, default: Installments.THRICE })
  paymentInstallments: Installments;

  @Column({
    type: "enum",
    enum: PurchaseStatus,
    default: PurchaseStatus.PENDING,
  })
  purchaseStatus: PurchaseStatus;

  @ManyToOne((type) => Supplier)
  @JoinColumn({ name: "supplierId" })
  supplier: Supplier;

  @ManyToOne((type) => Company)
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

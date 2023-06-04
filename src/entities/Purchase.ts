import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Supplier } from "./Supplier";
import { Company } from "./Company";
import { Stuff } from "./Stuff";

export enum PaymentForm {
  BILLED = "Faturado",
  CARD = "Cartão",
  CASH = "A vista",
}

export enum Installments {
  ONCE = "1X",
  TWICE = "2X",
  THRICE = "3X",
  PIX = "Pix",
  MONEY = "Dinheiro",
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

  @OneToMany(() => Stuff, (stuff) => stuff.purchase)
  stuffs: Stuff[];
}

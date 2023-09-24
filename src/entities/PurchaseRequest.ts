import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { PurchaseElement } from "./PurchaseElement";

@Entity("purchase_requests")
export class PurchaseRequest {
  @PrimaryGeneratedColumn()
  prId?: number;

  @CreateDateColumn()
  prDate?: Date;

  @ManyToOne(() => User, (user) => user.prequests)
  @JoinColumn()
  requestor: User;

  @OneToMany(() => PurchaseElement, (detail) => detail.prequest, {
    cascade: true,
    eager: true,
  })
  details: PurchaseElement[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Contract } from "../../contracts/entities/contract.entity";

@Entity("evaluations")
export class Evaluation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "contract_id" })
  contractId: string;

  @ManyToOne(() => Contract, (contract) => contract.evaluations)
  @JoinColumn({ name: "contract_id" })
  contract: Contract;

  @Column({ name: "evaluator_id" })
  evaluatorId: string;

  @Column({ name: "ratee_id" })
  rateeId: string;

  @Column({ name: "overall_rating", type: "int" })
  overallRating: number; // 1-5

  // e.g. { quality: 5, deadline: 4, communication: 5 }
  @Column({ type: "jsonb", nullable: true })
  criteria: Record<string, number>;

  @Column({ type: "text", nullable: true })
  comment: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}

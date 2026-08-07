import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { UserStatus, UserType } from "@/common/enums";
import { Contractor } from "@/modules/contractors/entities/contractor.entity";
import { Provider } from "@/modules/providers/entities/provider.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: UserType })
  type: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: "password_hash" })
  passwordHash: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.PENDING_VERIFICATION,
  })
  status: UserStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt: Date;

  @OneToOne(() => Contractor, (c) => c.user)
  contractor?: Contractor;

  @OneToOne(() => Provider, (p) => p.user)
  provider?: Provider;
}

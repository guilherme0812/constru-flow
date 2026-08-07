import { DocumentType, DocumentValidationStatus } from "@/common/enums";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum DocumentOwnerType {
  CONTRACTOR = "contractor",
  PROVIDER = "provider",
}

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "owner_id" })
  ownerId: string;

  @Column({ name: "owner_type", type: "enum", enum: DocumentOwnerType })
  ownerType: DocumentOwnerType;

  @Column({ type: "enum", enum: DocumentType })
  type: DocumentType;

  @Column({ name: "file_url" })
  fileUrl: string;

  @Column({
    name: "validation_status",
    type: "enum",
    enum: DocumentValidationStatus,
    default: DocumentValidationStatus.PENDING,
  })
  validationStatus: DocumentValidationStatus;

  @Column({ type: "date", nullable: true })
  expiresAt: Date | null;
}

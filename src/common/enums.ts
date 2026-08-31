export enum UserType {
  CONTRACTOR = "contractor",
  PROVIDER = "provider",
}

export enum UserStatus {
  PENDING_VERIFICATION = "peding_verification",
  ACTIVE = "active",
  SUSPENDED = "suspended",
}

export enum CompanySize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum ProviderType {
  INDIVIDUAL = "person",
  COMPANY = "company",
}

export enum DocumentType {
  CNPJ = "cnpj",
  CNDT = "cndt",
  CREA = "crea",
  CAU = "cau",
  CERTIDAO = "certidao",
  ALVARA = "alvara",
  OUTRO = "outro",
}

export enum DocumentValidationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum DemandStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  UNDER_REVIEW = "under_review",
  AWARDED = "awared",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum ApplicationStatus {
  SENT = "sent",
  UNDER_REVIEW = "under_review",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  WITHDRAWN = "withdrawn",
}

export enum ContractExecutionStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum NotificationType {
  NEW_DEMAND = "new_demand",
  NEW_APPLICATION = "new_application",
  RESULT = "result",
  EVALUATION_RECEIVED = "evaluation_received",
}

export enum UserType {
  CONTRACTOR = "contractor",
  PROVIDER = "provider",
}

export enum UserStatus {
  PENDING_VERIFICATION = "pendente_verificacao",
  ACTIVE = "ativo",
  SUSPENDED = "suspenso",
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
  PENDING = "pendente",
  APPROVED = "aprovado",
  REJECTED = "rejeitado",
}

export enum DemandStatus {
  DRAFT = "rascunho",
  PUBLISHED = "publicada",
  UNDER_REVIEW = "em_analise",
  AWARDED = "adjudicada",
  CANCELLED = "cancelada",
  COMPLETED = "concluida",
}

export enum ApplicationStatus {
  SENT = "enviada",
  UNDER_REVIEW = "em_analise",
  ACCEPTED = "aceita",
  REJECTED = "recusada",
  WITHDRAWN = "retirada",
}

export enum ContractExecutionStatus {
  NOT_STARTED = "nao_iniciado",
  IN_PROGRESS = "em_andamento",
  COMPLETED = "concluido",
  CANCELLED = "cancelado",
}

export enum NotificationType {
  NEW_DEMAND = "nova_demanda",
  NEW_APPLICATION = "nova_candidatura",
  RESULT = "resultado",
  EVALUATION_RECEIVED = "avaliacao_recebida",
}

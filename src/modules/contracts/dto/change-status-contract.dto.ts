import { ContractExecutionStatus } from "@/common/enums";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class ChangeStatusContractDto {
  @IsUUID()
  @IsString()
  id: string;

  @IsEnum(ContractExecutionStatus)
  executionStatus: ContractExecutionStatus;
}

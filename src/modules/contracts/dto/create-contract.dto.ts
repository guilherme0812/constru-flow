import { ContractExecutionStatus } from "@/common/enums";
import { IsDateString, IsEnum, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";

export class CreateContractDto {
  @IsUUID()
  @IsString()
  demandId: string;

  @IsUUID()
  @IsString()
  winningApplicationId: string;

  @IsNumber()
  @IsPositive()
  finalAmount: number;

  @IsDateString()
  signedAt: string;

  @IsEnum(ContractExecutionStatus)
  executionStatus: ContractExecutionStatus;
}

import { IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class CreateApplicationDto {
  @IsUUID()
  demandId: string;

  @IsUUID()
  providerId: string;

  @IsNumber()
  @IsPositive()
  proposedAmount: number;

  @IsNumber()
  @IsPositive()
  proposedDurationDays: number;

  @IsOptional()
  @IsString()
  termsAndConditions: string;
}

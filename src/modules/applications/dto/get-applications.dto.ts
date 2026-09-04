import { IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class GetApplicationsParamsDto {
  @IsOptional()
  @IsUUID()
  demandId: string;

  @IsOptional()
  @IsUUID()
  providerId: string;

  @IsOptional()
  @IsUUID()
  contractorId: string;
}

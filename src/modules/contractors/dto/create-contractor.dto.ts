import { CompanySize } from "@/common/enums";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateContractorDto {
  @IsString()
  userId: string;

  @IsString()
  legalName: string;

  @IsString()
  taxId: string;

  @IsEnum(CompanySize)
  companySize: CompanySize;

  @IsArray()
  @IsString({ each: true })
  operatingRegions?: string[];

  @IsNumber()
  @IsPositive()
  averageRating?: number;

  @IsBoolean()
  isDocumentVerified: boolean;
}

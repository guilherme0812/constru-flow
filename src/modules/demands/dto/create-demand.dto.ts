import { DemandStatus } from "@/common/enums";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateDemandDto {
  @IsString()
  contractorId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  categoryId: string;

  @IsString()
  worksiteLocation?: string;

  @IsNumber()
  locationLat: number;

  @IsNumber()
  locationLng: number;

  @IsDateString()
  estimatedStartDate: string;

  @IsNumber()
  @IsPositive()
  executionPeriodDays: number;

  @IsOptional()
  @IsString()
  budgetRange: string;

  @IsArray()
  @IsString({ each: true })
  requiredDocuments?: string[];

  @IsDateString()
  applicationDeadline: string;

  @IsEnum(DemandStatus)
  status: DemandStatus;
}

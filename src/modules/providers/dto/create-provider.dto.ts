import { ProviderType } from "@/common/enums";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateProviderDto {
  @IsString()
  userId: string;

  @IsString()
  legalName: string;

  @IsString()
  taxId: string;

  @IsEnum(ProviderType)
  providerType: ProviderType;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID("4", { each: true })
  specialties: string[];

  @IsArray()
  @IsString({ each: true })
  operatingRegions?: string[];

  @IsNumber()
  @IsPositive()
  teamCapacity?: number;

  @IsArray()
  @IsString({ each: true })
  portfolio?: string[];
}

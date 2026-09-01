import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  contractId: string;

  @IsString()
  @IsNotEmpty()
  evaluatorId: string;

  @IsString()
  @IsNotEmpty()
  rateeId: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(5)
  overallRating: number;

  @IsObject()
  criteria: Record<string, number>;

  @IsString()
  @IsOptional()
  comment: string;
}

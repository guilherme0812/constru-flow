import { ApplicationStatus } from "@/common/enums";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class ChangeStatusApplicationDto {
  @IsUUID()
  @IsString()
  id: string;

  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}

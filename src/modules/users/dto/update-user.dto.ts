import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserType } from "@/common/enums";

export class UpdateUserDto {
  @IsOptional()
  @IsEnum(UserType)
  type: UserType;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

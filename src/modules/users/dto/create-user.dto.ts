import { UserType } from "@/common/enums";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEnum(UserType)
  type: UserType;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;
}

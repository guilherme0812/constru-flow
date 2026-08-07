import { UserType } from "@/common/enums"
import { } from "class-validator"

export class CreateUserDto {
    type: UserType
    email: string
    password: string
    phone?: string
}
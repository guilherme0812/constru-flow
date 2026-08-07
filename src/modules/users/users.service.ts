import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  create(body: CreateUserDto) {}

  findOne() {}

  update(id: string, body: UpdateUserDto) {}

  activate(id: string) {}

  suspend(id: string) {}

  remove(id: string) {}

  hasPassword() {}
}

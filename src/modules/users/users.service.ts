import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { UserStatus } from "@/common/enums";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(body: CreateUserDto) {
    const existing = await this.usersRepo.findOne({ where: { email: body.email } });

    if (existing) throw new ConflictException("Userr already registered");

    const hash = await this.hashPassword(body.password);
    const user = this.usersRepo.create({
      email: body.email,
      passwordHash: hash,
      phone: body.phone,
      type: body.type,
      status: UserStatus.PENDING_VERIFICATION,
    });
    return this.usersRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id },
      //select: { provider: true, contractor: true },
    });
    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async update(id: string, body: UpdateUserDto) {
    const user = await this.findOne(id);

    Object.assign(user, {
      email: body.email ?? user.email,
      phone: body.phone ?? user.phone,
    });

    return this.usersRepo.save(user);
  }

  async activate(id: string) {
    const user = await this.findOne(id);

    user.status = UserStatus.ACTIVE;
    return this.usersRepo.save(user);
  }

  async suspend(id: string) {
    const user = await this.findOne(id);

    user.status = UserStatus.SUSPENDED;
    return this.usersRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    await this.usersRepo.remove(user);
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!hashedPassword) {
      throw new ConflictException("Internal error");
    }

    return hashedPassword;
  }
}

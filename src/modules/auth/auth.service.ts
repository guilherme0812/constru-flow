import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

export interface JwtPayload {
  sub: string;
  email: string;
  //   role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.userRepository
      .createQueryBuilder("users")
      .addSelect("users.passwordHash")
      .where("users.email = :email", { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!user || !(await this.comparePassword(password, user.passwordHash))) {
      throw new Error("Invalid credentials");
    }
    return this.signToken(user);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: payload.sub });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  private async comparePassword(plain: string, password: string): Promise<boolean> {
    return bcrypt.compare(plain, password);
  }

  private signToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      //   role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, status: user.status, type: user.type },
    };
  }
}

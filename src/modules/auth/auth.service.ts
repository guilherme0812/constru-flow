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
      .leftJoinAndSelect("users.contractor", "contractor")
      .leftJoinAndSelect("users.provider", "provider")
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
  async getCompleteUserData(userId: string): Promise<User> {
    const userData = await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        contractor: true,
        provider: true,
      },
    });

    if (!userData) {
      throw new UnauthorizedException("Usuário não encontrado");
    }

    return userData;
  }

  private async comparePassword(plain: string, password: string): Promise<boolean> {
    return bcrypt.compare(plain, password);
  }

  private signToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const { passwordHash, ...userWithoutPassword } = user;

    return {
      accessToken: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}

import { Module } from "@nestjs/common";
import { Provider } from "./entities/provider.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProvidersController } from "./provider.controller";
import { ProvidersService } from "./provider.service";

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contract } from "./entities/contract.entity";
import { ContractsController } from "./contract.controller";
import { ContractsService } from "./contract.service";

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}

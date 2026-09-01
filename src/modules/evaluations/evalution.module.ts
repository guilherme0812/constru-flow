import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Evaluation } from "./entities/evaluation.entity";
import { EvaluationsService } from "./evaluation.service";
import { EvaluationsController } from "./evaluation.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation])],
  controllers: [EvaluationsController],
  providers: [EvaluationsService],
})
export class EvaluationsModule {}

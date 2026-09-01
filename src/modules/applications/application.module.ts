import { Module } from "@nestjs/common";
import { Application } from "./entities/application.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationsController } from "./application.controller";
import { ApplicationsService } from "./application.service";

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
})
export class ApplicationsModule {}

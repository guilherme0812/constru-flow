import { Module } from "@nestjs/common";
import { CtaegoriesController } from "./category.controller";
import { CategoriesService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CtaegoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

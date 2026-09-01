import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EvaluationsService } from "./evaluation.service";
import { CreateEvaluationDto } from "./dto/create-evaluation.dto";

@Controller("evaluations")
export class EvaluationsController {
  constructor(private readonly evaluationsServide: EvaluationsService) {}

  @Post()
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationsServide.create(dto);
  }

  @Get()
  findAll() {
    return this.evaluationsServide.findAll();
  }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.evaluationsServide.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: any) {
    return this.evaluationsServide.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.evaluationsServide.remove(id);
  }
}

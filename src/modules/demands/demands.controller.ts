import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateDemandDto } from "./dto/create-demand.dto";
import { DemandsService } from "./demands.service";

@Controller("demands")
export class DemandsController {
  constructor(private readonly demandsServide: DemandsService) {}

  @Post()
  create(@Body() dto: CreateDemandDto) {
    return this.demandsServide.create(dto);
  }

  @Get()
  findAll() {
    return this.demandsServide.findAll();
  }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.demandsServide.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: any) {
    return this.demandsServide.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.demandsServide.remove(id);
  }
}

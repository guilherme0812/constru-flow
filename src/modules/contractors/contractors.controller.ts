import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ContractorsService } from "./contractors.service";
import { CreateContractorDto } from "./dto/create-contractor.dto";

@Controller("contractors")
export class ContractorsController {
  constructor(private readonly contractorsService: ContractorsService) {}

  @Post()
  create(@Body() dto: CreateContractorDto) {
    return this.contractorsService.create(dto);
  }

  @Get()
  findAll() {
    return this.contractorsService.findAll();
  }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.contractorsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: any) {
    return this.contractorsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.contractorsService.remove(id);
  }
}

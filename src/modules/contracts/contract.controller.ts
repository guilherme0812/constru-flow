import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ContractsService } from "./contract.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { ChangeStatusContractDto } from "./dto/change-status-contract.dto";

@Controller("contracts")
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  create(@Body() dto: CreateContractDto) {
    return this.contractsService.create(dto);
  }

  @Post("change-status")
  changeStatus(@Body() dto: ChangeStatusContractDto) {
    return this.contractsService.changeStatus(dto);
  }

  @Get()
  findAll() {
    return this.contractsService.findAll();
  }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.contractsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: any) {
    return this.contractsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.contractsService.remove(id);
  }
}

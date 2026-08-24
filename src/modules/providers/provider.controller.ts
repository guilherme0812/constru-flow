import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProvidersService } from "./provider.service";
import { CreateProviderDto } from "./dto/create-provider.dto";

@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() dto: CreateProviderDto) {
    return this.providersService.create(dto);
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: any) {
    return this.providersService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.providersService.remove(id);
  }
}

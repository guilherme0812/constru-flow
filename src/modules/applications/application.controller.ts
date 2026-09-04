import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApplicationsService } from "./application.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { ChangeStatusApplicationDto } from "./dto/change-status-application.dto";
import { GetApplicationsParamsDto } from "./dto/get-applications.dto";

@Controller("applications")
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }

  @Post("change-status")
  changeStatus(@Body() dto: ChangeStatusApplicationDto) {
    return this.applicationsService.changeStatus(dto);
  }

  @Get()
  findAll(@Query() params: GetApplicationsParamsDto) {
    return this.applicationsService.findAll(params);
  }

  @Get(":id")
  findOneById(@Param("id") id: string) {
    return this.applicationsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: any) {
    return this.applicationsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.applicationsService.remove(id);
  }
}

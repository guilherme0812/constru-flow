import { Repository } from "typeorm";
import { Application } from "./entities/application.entity";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChangeStatusApplicationDto } from "./dto/change-status-application.dto";
import { GetApplicationsParamsDto } from "./dto/get-applications.dto";

export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationsRepository: Repository<Application>,
  ) {}

  async create(dto: CreateApplicationDto) {
    // const exist = await this.findOne(body.userId);

    // if (exist) {
    //   throw new ConflictException("Internal error");
    // }

    const application = this.applicationsRepository.create({
      attachedDocuments: [],
      demandId: dto.demandId,
      proposedAmount: dto.proposedAmount,
      proposedDurationDays: dto.proposedDurationDays,
      providerId: dto.providerId,
      termsAndConditions: dto.termsAndConditions,
    });

    return this.applicationsRepository.save(application);
  }

  async changeStatus(dto: ChangeStatusApplicationDto) {
    const application = await this.findOne(dto.id);

    if (!application) {
      throw new ConflictException("Internal error");
    }

    application.status = dto.status;

    return this.applicationsRepository.save(application);
  }

  findAll(params: GetApplicationsParamsDto): Promise<Application[]> {
    return this.applicationsRepository.find({
      select: {
        id: true,
        proposedAmount: true,
        termsAndConditions: true,
        status: true,
        proposedDurationDays: true,
        createdAt: true,
      },
      relations: {
        demand: {
          contractor: true,
          category: true,
        },
        provider: true,
      },
      ...(params
        ? {
            where: {
              ...(params.demandId ? { demandId: params.demandId } : {}),
              ...(params.providerId ? { providerId: params.providerId } : {}),
              ...(params.contractorId ? { contractorId: params.contractorId } : {}),
            },
          }
        : {}),
    });
  }

  async findOne(id: string): Promise<Application | null> {
    return this.applicationsRepository.findOne({ where: { id } });
  }

  async update(id: string, body: any) {
    const application = this.findOne(id);

    if (!application) {
      throw new ConflictException("Internal error");
    }

    const updated = Object.assign(application, body);

    return this.applicationsRepository.save(updated);
  }

  async remove(id: string) {
    const application = await this.findOne(id);

    if (!application) {
      throw new ConflictException("Internal error");
    }

    await this.applicationsRepository.remove(application);
  }
}

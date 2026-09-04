import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConflictException } from "@nestjs/common";
import { Demand } from "./entities/demand.entity";
import { CreateDemandDto } from "./dto/create-demand.dto";

export class DemandsService {
  constructor(
    @InjectRepository(Demand)
    private readonly demandsRepo: Repository<Demand>,
  ) {}

  async create(dto: CreateDemandDto) {
    const demand = this.demandsRepo.create({
      applicationDeadline: new Date(dto.applicationDeadline),
      budgetRange: dto.budgetRange,
      categoryId: dto.categoryId,
      contractorId: dto.contractorId,
      description: dto.description,
      estimatedStartDate: new Date(dto.estimatedStartDate),
      executionPeriodDays: dto.executionPeriodDays,
      locationLat: dto.locationLat,
      locationLng: dto.locationLng,
      requiredDocuments: dto.requiredDocuments,
      title: dto.title,
      status: dto.status,
      applications: [],
      worksiteLocation: dto.worksiteLocation,
    });

    return this.demandsRepo.save(demand);
  }

  findAll(): Promise<Demand[]> {
    return this.demandsRepo
      .createQueryBuilder("demand")
      .leftJoin("demand.category", "category")
      .addSelect("category.name")
      .getMany();
  }

  async findOne(id: string): Promise<Demand | null> {
    return this.demandsRepo
      .createQueryBuilder("demand")
      .leftJoinAndSelect("demand.contractor", "contractor")
      .leftJoin("demand.category", "category")
      .leftJoinAndSelect("demand.applications", "applications")
      .where("demand.id = :id", { id })
      .select(["demand", "contractor", "applications", "category.id", "category.name"])
      .getOne();
  }

  async update(id: string, body: any) {
    const provider = this.findOne(id);

    if (!provider) {
      throw new Error("Erro");
    }

    const updated = Object.assign(provider, body);

    return this.demandsRepo.save(updated);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);

    if (!provider) {
      throw new ConflictException("Internal error");
    }

    await this.demandsRepo.remove(provider);
  }
}

import { InjectRepository } from "@nestjs/typeorm";
import { Contractor } from "./entities/contractor.entity";
import { Repository } from "typeorm";
import { ConflictException } from "@nestjs/common";
import { CreateContractorDto } from "./dto/create-contractor.dto";

export class ContractorsService {
  constructor(
    @InjectRepository(Contractor)
    private readonly contractorsRepo: Repository<Contractor>,
  ) {}

  async create(body: CreateContractorDto) {
    const exist = await this.findOne(body.userId);

    if (exist) {
      throw new ConflictException("Internal error");
    }

    const provider = this.contractorsRepo.create({
      userId: body.userId,
      legalName: body.legalName,
      taxId: body.taxId,
      companySize: body.companySize,
      operatingRegions: body.operatingRegions,
      averageRating: body.averageRating,
      isDocumentVerified: body.isDocumentVerified,
      demands: [],
    });

    return this.contractorsRepo.save(provider);
  }

  findAll(): Promise<Contractor[]> {
    return this.contractorsRepo.find();
  }

  async findOne(id: string): Promise<Contractor | null> {
    return this.contractorsRepo.findOne({ where: { userId: id } });
  }

  async update(id: string, body: any) {
    const provider = this.findOne(id);

    if (!provider) {
      throw new Error("Erro");
    }

    const updated = Object.assign(provider, body);

    return this.contractorsRepo.save(updated);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);

    if (!provider) {
      throw new ConflictException("Internal error");
    }

    await this.contractorsRepo.remove(provider);
  }
}

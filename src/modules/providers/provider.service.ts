import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "./entities/provider.entity";
import { Repository } from "typeorm";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { ConflictException } from "@nestjs/common";

export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providersRepo: Repository<Provider>,
  ) {}

  async create(body: CreateProviderDto) {
    const exist = await this.findOne(body.userId);

    if (exist) {
      throw new ConflictException("Internal error");
    }

    const specialties = [];

    const provider = this.providersRepo.create({
      userId: body.userId,
      legalName: body.legalName,
      taxId: body.taxId,
      providerType: body.providerType,
      specialties: specialties,
      operatingRegions: body.operatingRegions,
      teamCapacity: body.teamCapacity,
      portfolio: body.portfolio,
    });

    return this.providersRepo.save(provider);
  }

  findAll(): Promise<Provider[]> {
    return this.providersRepo.find();
  }

  async findOne(id: string): Promise<Provider | null> {
    return this.providersRepo.findOne({ where: { userId: id } });
  }

  async update(id: string, body: any) {
    const provider = this.findOne(id);

    if (!provider) {
      throw new Error("Erro");
    }

    const updated = Object.assign(provider, body);

    return this.providersRepo.save(updated);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);

    if (!provider) {
      throw new ConflictException("Internal error");
    }

    await this.providersRepo.remove(provider);
  }
}

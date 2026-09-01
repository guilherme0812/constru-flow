import { InjectRepository } from "@nestjs/typeorm";
import { Contract } from "./entities/contract.entity";
import { Repository } from "typeorm";
import { CreateContractDto } from "./dto/create-contract.dto";
import { ConflictException } from "@nestjs/common";
import { ChangeStatusContractDto } from "./dto/change-status-contract.dto";

export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepository: Repository<Contract>,
  ) {}

  async create(dto: CreateContractDto) {
    const application = this.contractsRepository.create({
      demandId: dto.demandId,
      evaluations: [],
      executionStatus: dto.executionStatus,
      finalAmount: dto.finalAmount,
      signedAt: new Date(dto.signedAt),
      winningApplicationId: dto.winningApplicationId,
    });

    return this.contractsRepository.save(application);
  }

  async changeStatus(dto: ChangeStatusContractDto) {
    const contract = await this.findOne(dto.id);

    if (!contract) {
      throw new ConflictException("Internal error");
    }

    contract.executionStatus = dto.executionStatus;

    return this.contractsRepository.save(contract);
  }

  findAll(): Promise<Contract[]> {
    return this.contractsRepository.find();
  }

  async findOne(id: string): Promise<Contract | null> {
    return this.contractsRepository.findOne({ where: { id } });
  }

  async update(id: string, body: any) {
    const application = this.findOne(id);

    if (!application) {
      throw new ConflictException("Internal error");
    }

    const updated = Object.assign(application, body);

    return this.contractsRepository.save(updated);
  }

  async remove(id: string) {
    const application = await this.findOne(id);

    if (!application) {
      throw new ConflictException("Internal error");
    }

    await this.contractsRepository.remove(application);
  }
}

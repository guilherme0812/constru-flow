import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConflictException } from "@nestjs/common";
import { Evaluation } from "./entities/evaluation.entity";
import { CreateEvaluationDto } from "./dto/create-evaluation.dto";

export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationsRepo: Repository<Evaluation>,
  ) {}

  async create(dto: CreateEvaluationDto) {
    const demand = this.evaluationsRepo.create({
      contractId: dto.contractId,
      evaluatorId: dto.evaluatorId,
      rateeId: dto.rateeId,
      overallRating: dto.overallRating,
      criteria: dto.criteria,
      comment: dto.comment,
    });

    return this.evaluationsRepo.save(demand);
  }

  findAll(): Promise<Evaluation[]> {
    return this.evaluationsRepo.find();
  }

  async findOne(id: string): Promise<Evaluation | null> {
    return this.evaluationsRepo.findOne({ where: { id } });
  }

  async update(id: string, body: any) {
    const provider = this.findOne(id);

    if (!provider) {
      throw new Error("Erro");
    }

    const updated = Object.assign(provider, body);

    return this.evaluationsRepo.save(updated);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);

    if (!provider) {
      throw new ConflictException("Internal error");
    }

    await this.evaluationsRepo.remove(provider);
  }
}

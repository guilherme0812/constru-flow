import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { ConflictException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";

export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const provider = this.categoriesRepo.create({
      name: dto.name,
      parentId: dto.parentId,
    });

    return this.categoriesRepo.save(provider);
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepo.find();
  }

  async findOne(id: string): Promise<Category | null> {
    return this.categoriesRepo.findOne({ where: { id } });
  }

  async update(id: string, body: any) {
    const provider = this.findOne(id);

    if (!provider) {
      throw new Error("internal Error");
    }

    const updated = Object.assign(provider, body);

    return this.categoriesRepo.save(updated);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);

    if (!provider) {
      throw new ConflictException("Internal error");
    }

    await this.categoriesRepo.remove(provider);
  }
}

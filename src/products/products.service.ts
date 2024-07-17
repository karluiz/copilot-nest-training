import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductEntity } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<ProductEntity> {
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async create(product: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save(product);
  }
}

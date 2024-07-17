import { BadRequestException, Injectable } from "@nestjs/common";
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
    // * check if the product with the same name already exists
    const existingProduct = await this.productRepository.findOne({
      where: { name: product.name },
    });

    if (existingProduct) {
      throw new BadRequestException("Product already exists");
    }

    return this.productRepository.save(product);
  }

  async update(id: string, product: CreateProductDto): Promise<ProductEntity> {
    await this.findProductById(id);

    return this.productRepository.save({ ...product, id });
  }

  async remove(id: string): Promise<boolean> {
    await this.findProductById(id);

    const isDeleted = await this.productRepository.delete(id);

    return isDeleted.affected > 0;
  }

  private async findProductById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new BadRequestException("Product not found");
    }

    return product;
  }
}

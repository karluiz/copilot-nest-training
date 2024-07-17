import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
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

  // * update method that receive updateproductdto and return the updated product
  async update(product: UpdateProductDto): Promise<ProductEntity> {
    // * find the product by id
    const productToUpdate = await this.productRepository.findOne({
      where: { id: product.id },
    });

    // * if the product not found return null
    if (!productToUpdate) {
      throw new BadRequestException("Product not found");
    }

    // * update the product with the new values
    return await this.productRepository.save({
      ...productToUpdate,
      ...product,
    });
  }

  // * delete method that receive the id and return the deleted product
  async delete(id: string): Promise<ProductEntity> {
    // * find the product by id
    const productToDelete = await this.productRepository.findOne({
      where: { id },
    });

    // * if the product not found return null
    if (!productToDelete) {
      throw new BadRequestException("Product not found");
    }

    // * delete the product
    await this.productRepository.delete(id);

    return productToDelete;
  }
}

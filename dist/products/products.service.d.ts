import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "./entities/product.entity";
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    findAll(): Promise<ProductEntity[]>;
    findOne(id: string): Promise<ProductEntity>;
    create(product: CreateProductDto): Promise<ProductEntity>;
    update(product: UpdateProductDto): Promise<ProductEntity>;
    delete(id: string): Promise<ProductEntity>;
}

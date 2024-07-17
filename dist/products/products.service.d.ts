import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductEntity } from "./entities/product.entity";
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    findAll(): Promise<ProductEntity[]>;
    findOne(id: string): Promise<ProductEntity>;
    create(product: CreateProductDto): Promise<ProductEntity>;
    update(id: string, product: CreateProductDto): Promise<ProductEntity>;
    remove(id: string): Promise<boolean>;
    private findProductById;
}

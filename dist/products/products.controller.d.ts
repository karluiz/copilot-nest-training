import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(): Promise<import("./entities/product.entity").ProductEntity[]>;
    getProductById(id: string): Promise<import("./entities/product.entity").ProductEntity>;
    createProduct(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
}

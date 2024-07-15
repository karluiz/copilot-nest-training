import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get(":id")
  getProductById(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}

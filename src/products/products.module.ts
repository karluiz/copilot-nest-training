import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsSeeder } from "./products.seeder";
import { ProductsService } from "./products.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsSeeder],
})
export class ProductsModule {}

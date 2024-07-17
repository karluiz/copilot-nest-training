import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductsService } from "./products.service";

// * mock models
const productModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
};

describe("ProductsService", () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: productModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

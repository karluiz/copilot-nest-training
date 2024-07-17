import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { ProductsService } from "./products.service";

let service: ProductsService;

// * mock models
const productModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

const products = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    description: "Description 1",
    image: "Image 1",
  },
  {
    id: "2",
    name: "Product 2",
    price: 200,
    description: "Description 2",
    image: "Image 2",
  },
];

describe("ProductsService", () => {
  beforeAll(async () => {
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

  it("should return an array of products", async () => {
    // Arrange
    productModel.find.mockResolvedValue(products);

    // Act
    const result = await service.findAll();

    // Assert
    expect(result).toEqual(products);
  });

  it("should return a product by id", async () => {
    // Arrange
    const product = products[0];
    productModel.findOne.mockResolvedValue(product);

    // Act
    const result = await service.findOne(product.id);

    // Assert
    expect(result).toEqual(product);
  });

  it("should create a product", async () => {
    // Arrange
    const product = products[0];
    productModel.save.mockResolvedValue(product);

    // Act
    const result = await service.create({
      name: product.name,
      description: product.description,
      image: product.image,
    });

    // Assert
    expect(result).toEqual(product);
  });
});

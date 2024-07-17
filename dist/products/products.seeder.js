"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsSeeder = void 0;
const faker_1 = require("@faker-js/faker");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
let ProductsSeeder = class ProductsSeeder {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async onModuleInit() {
        await this.seedProducts();
    }
    async seedProducts() {
        const products = await this.productsService.findAll();
        if (products.length > 0) {
            return;
        }
        for (let i = 0; i < 10; i++) {
            const product = {
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.lorem.sentence(),
                image: faker_1.faker.image.urlLoremFlickr({
                    category: "products",
                }),
            };
            await this.productsService.create(product);
        }
    }
};
ProductsSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsSeeder);
exports.ProductsSeeder = ProductsSeeder;
//# sourceMappingURL=products.seeder.js.map
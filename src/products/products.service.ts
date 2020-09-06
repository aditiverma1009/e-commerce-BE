import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDTO,
  GetProductsFilterDTO,
} from './dto/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.createProduct(createProductDto);
  }

  async findProductById(id: number): Promise<Product> {
    const found = await this.productsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getProductsByFilter(filterDTO: GetProductsFilterDTO): Promise<Product[]> {
    return this.productsRepository.getProducts(filterDTO)
  }

  // findAllByFilter(limit: number, category: string, search: string): Product[] {
  //   let filteredData = this.products;
  //   if (category) {
  //     filteredData = filteredData.filter(
  //       eachProduct => eachProduct.category === category,
  //     );
  //   }
  //   if (search) {
  //     filteredData = filteredData.filter(eachProduct => {
  //       return (
  //         eachProduct.category.includes(search) ||
  //         eachProduct.name.includes(search)
  //       );
  //     });
  //   }
  //   return filteredData.slice(0, limit);
  // }

  async updateProductById(
    id: number,
    updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    const product = await this.findProductById(id);
    const keyToBeUpdated = Object.keys(updateProductDTO);
    keyToBeUpdated.forEach(eachKey => {
      product[eachKey] = updateProductDTO[eachKey];
    });
    await product.save();
    return product;
  }

  async deleteProductById(id: number): Promise<void> {
    const rows = await this.productsRepository.delete({ id: id });
    if (rows.affected === 0) {
      throw new NotFoundException(`Product ${id} not found`);
    }
  }
}

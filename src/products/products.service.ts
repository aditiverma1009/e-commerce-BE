import { Injectable } from '@nestjs/common';
import { Product, ListAllEntities } from './products.model';
import { CreateProductDto, UpdateProductDTO } from './dto/products.dto';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto): Product {
    const { name, category } = createProductDto;
    const product = {
      id: uuidv1(),
      name,
      category,
    };
    this.products.push(product);
    return product;
  }

  findProductById(id: string): Product {
    return this.products.find(eachProduct => eachProduct.id === id);
  }

  findAll(query: ListAllEntities): Product[] {
    return this.products.slice(0, query.limit);
  }

  updateProductById(
    id: string,
    label: string,
    updateProductDTO: UpdateProductDTO,
  ): Product {
    // product hold the ref to the product, hence directly gets updated
    const product = this.findProductById(id);
    product[label] = updateProductDTO[label];
    return product;
  }

  deleteProductById(id: string): void {
    this.products = this.products.filter(eachProduct => eachProduct.id !== id);
  }
}

import { Injectable } from '@nestjs/common';
import { Product, ListAllEntities } from './products.model';
import { CreateProductDto } from './dto/products.dto';
import * as uuid from 'uuid';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  create(createProductDto: CreateProductDto): Product {
    const { name, category } = createProductDto;
    const product = {
      id: uuid(),
      name,
      category,
    };
    this.products.push(product);
    return product;
  }

  findAll(query: ListAllEntities): Product[] {
    return this.products.slice(0, query.limit);
  }
}

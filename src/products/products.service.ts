import { Injectable } from '@nestjs/common';
import { Product, ListAllEntities } from './products.model';
import { CreateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];

  create(createProductDto: CreateProductDto): Product {
     this.products.push(createProductDto);
     return createProductDto;
  }

  findAll(query: ListAllEntities): Product[] {
    return this.products.slice(0, query.limit);
  }
}
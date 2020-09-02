import { Controller, Get, Post, Body, Query, Param, Put, Delete } from '@nestjs/common';
import {  ListAllEntities, Product } from './products.model';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService){}
    @Post()
    create(@Body() createProductDto: CreateProductDto): Product {
      return this.productsService.create(createProductDto);
    }
  
    @Get()
    findAll(@Query() query: ListAllEntities): Product[] {
      return this.productsService.findAll(query);
    }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ListAllEntities, Product } from './products.model';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDTO } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }

  @Get('/:id')
  findProductById(@Param('id') id: string): Product {
    return this.productsService.findProductById(id);
  }

  @Get()
  findAll(
    @Query() query: ListAllEntities,
  ): Product[] {
      const {limit, category, search}= query;
    if (category.length|| search.length) {
      return this.productsService.findAllByFilter(limit, category, search);
    } else {
      return this.productsService.findAll(query);
    }
  }

  @Patch('/:id/:label')
  updateProductById(
    @Param('id') id: string,
    @Param('label') label: string,
    @Body() updateProductDTO: UpdateProductDTO,
  ): Product {
    return this.productsService.updateProductById(id, label, updateProductDTO);
  }

  @Delete('/:id')
  deleteProductById(@Param('id') id: string): void {
    this.productsService.deleteProductById(id);
  }
}

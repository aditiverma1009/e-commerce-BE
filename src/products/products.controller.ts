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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ListAllEntities, Product } from './products.model';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDTO } from './dto/products.dto';
import { ProductCategoryValidation } from './dto/product-category-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }

  @Get('/:id')
  findProductById(@Param('id') id: string): Product {
    return this.productsService.findProductById(id);
  }

  @Get()
  findTasks(@Query() query: ListAllEntities): Product[] {
    const { limit, category, search } = query;
    if (category.length || search.length) {
      return this.productsService.findAllByFilter(limit, category, search);
    } else {
      return this.productsService.findAll(query);
    }
  }

  // add validation for label, check that the category can be certain options
  @Patch('/:id')
  updateProductById(
    @Param('id') id: string,
    @Body(ProductCategoryValidation) updateProductDTO: UpdateProductDTO,
  ): Product {
    return this.productsService.updateProductById(id, updateProductDTO);
  }

  @Delete('/:id')
  deleteProductById(@Param('id') id: string): void {
    this.productsService.deleteProductById(id);
  }
}

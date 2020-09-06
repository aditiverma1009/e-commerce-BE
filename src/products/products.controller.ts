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
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDTO, GetProductsFilterDTO } from './dto/products.dto';
import { ProductCategoryValidation } from './dto/product-category-validation.pipe';
import { Product } from './products.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findProductById(id);
  }

  @Get()
  getProducts(@Query(ValidationPipe) query: GetProductsFilterDTO): Promise<Product[]> {
      return this.productsService.getProductsByFilter(query);
  }

  // add validation for label, check that the category can be certain options
  @Patch('/:id')
  updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ProductCategoryValidation) updateProductDTO: UpdateProductDTO,
  ): Promise<Product> {
    return this.productsService.updateProductById(id, updateProductDTO);
  }

  @Delete('/:id')
  deleteProductById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.deleteProductById(id);
  }
}

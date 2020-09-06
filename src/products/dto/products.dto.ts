import { IsNotEmpty, IsNumberString, IsIn } from "class-validator";
import { ProductCategories } from "../product-category.enum";

export class CategoryDTO {
    @IsIn([...Object.values(ProductCategories), '']) 
    category?: ProductCategories
}

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsIn([...Object.values(ProductCategories), '']) 
    category: ProductCategories;
}
  
export class UpdateProductDTO  extends CategoryDTO{
    name?: string;
}

export class GetProductsFilterDTO extends CategoryDTO {
    @IsNumberString()
    limit: number;
  
    search: string;
}
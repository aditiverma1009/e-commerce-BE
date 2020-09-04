import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    category: string;
}
  
export class UpdateProductDTO {
    name?: string;
    category?: string
}
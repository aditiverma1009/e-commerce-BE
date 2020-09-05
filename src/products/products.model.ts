import { IsIn, IsNumberString } from "class-validator";

export class ListAllEntities {
  @IsNumberString()
  limit: number;

  @IsIn(['Clothing', 'Footwear', 'Accessories', ''])
  category: string;

  search: string;
}

export class Product {
  id: string;
  name: string;
  category: string;
}

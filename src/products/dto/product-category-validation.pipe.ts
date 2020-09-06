import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ProductCategories } from '../product-category.enum';

export class ProductCategoryValidation implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('metadata', metadata)
    if (value.category) {
        if(!this.isCategoryValid(value.category)) {
            throw new BadRequestException(`${value.category} is an invalid category`)
        }
    }

    return value;
  }

  private isCategoryValid(status: any): boolean {
    if (Object.values(ProductCategories).includes(status)) return true;
    else return false;
  }
}

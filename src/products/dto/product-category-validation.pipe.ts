import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

export class ProductCategoryValidation implements PipeTransform {
  readonly allowedCategories = ['Clothing', 'Footwear', 'Accessories'];

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
    if (this.allowedCategories.includes(status)) return true;
    else return false;
  }
}

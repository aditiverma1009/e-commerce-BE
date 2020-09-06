import { Repository, EntityRepository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto, GetProductsFilterDTO } from './dto/products.dto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, category } = createProductDto;
    const product = new Product();
    product.name = name;
    product.category = category;
    return await product.save();
  }

  async getProducts(filterDTO: GetProductsFilterDTO): Promise<Product[]> {
    const { limit, category, search } = filterDTO;
    const query = this.createQueryBuilder('products');
    if (category) {
      query.andWhere('products.category = :category', { category });
    }
    if (search) {
      query
        .andWhere('(products.category LIKE :search OR products.name LIKE :search)', {
          search: `%${search}%`
        })
    }
    const filteredProducts = await query.getMany();
    return filteredProducts;
  }
}

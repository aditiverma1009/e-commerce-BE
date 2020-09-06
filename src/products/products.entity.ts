import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ProductCategories } from "./product-category.enum";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: ProductCategories;
}
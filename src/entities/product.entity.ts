import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { UserTable } from './user.entity';

@Entity()
export class Product{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({type: 'float'})
  price: number;

  @Column({default: true})
  is_active: boolean;

  @ManyToOne(() => UserTable, (user_table) => user_table.id)
  @JoinColumn({name: 'user_table_id'})
  user_table: UserTable
  
  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({name: 'category_id'})
  category: Category

}
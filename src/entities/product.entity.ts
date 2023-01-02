import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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

  @Column({default: true})
  is_active: boolean;

  @ManyToOne(type => UserTable, user_table => user_table.id)
  @JoinColumn({name: 'user_table_id'})
  user_table: UserTable

  @ManyToOne(type => Category, category => category.id)
  @JoinColumn({name: 'category_id'})
  category: Category

}
import { Entity ,Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserTable } from './user.entity';

@Entity()
export class BranchOffice{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  direction: string;

  @Column()
  name: string;
  
  @Column()
  is_active: string;

  @ManyToOne(type => UserTable, user_table => user_table.id)
  @JoinColumn({name: 'user_table_id'})
  user_table: UserTable

}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { BranchOffice } from './branch_office.entity';

@Entity()
export class UserTable{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  password: string;

  @Column({unique: true})
  email: string;

  @Column({default: true})
  is_active: boolean;

  @Column()
  type: string;

  @OneToMany(type => BranchOffice, branch_office => branch_office.id)
  @JoinColumn({name: 'branch_offices'})
  branch_offices: BranchOffice[]

}
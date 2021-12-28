import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Entity()
export class User {
  
  @PrimaryColumn()
  id: string;
  
  @Column()
  sub: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column('simple-array')
  major: string[];

  @Column()
  introduce: string;

  @Column()
  classNum: number;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolio: Portfolio[];
}

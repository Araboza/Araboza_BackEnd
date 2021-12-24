import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imgUrl: string;

  @CreateDateColumn()
  createDate: Date;

  @ManyToOne(() => User, (user) => user.portfolio)
  user: User;

  @Column({ array: true })
  tag: string[];

  @Column()
  like: number;
}

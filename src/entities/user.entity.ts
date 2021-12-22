import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  sub: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  userImg: string;
}

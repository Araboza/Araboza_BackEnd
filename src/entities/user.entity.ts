import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  sub: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  picture: string;
}

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

  @Column('simple-array')
  major: string[];

  @Column()
  introduce: string;
}

export class User2 {
  name: string;
  email: string;
  sub: string;
  picture: string;
  major: string[];
  introduce: string;
}

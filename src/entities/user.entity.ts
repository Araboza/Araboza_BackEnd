import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  toJSON(): string | object | Buffer {
    throw new Error('Method not implemented.');
  }
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


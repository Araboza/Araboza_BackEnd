import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({description:'id'})
  id: number;

  @ApiProperty({description:'포트폴리오 제목'})
  @Column()
  title: string;

  @ApiProperty({description:'포트폴리오에 들어간 IMG URL'})
  @Column()
  imgUrl: string;

  @ApiProperty({description:'만들어진 날짜'})
  @CreateDateColumn()
  createDate: Date;
  
  @ApiProperty({description:'포트폴리오 내용'})
  @Column()
  contents: string;

  @ApiProperty({description:'유저 테이블'})
  @ManyToOne(() => User, (user) => user.portfolio)
  user: User;

  @ApiProperty({description:'포트폴리오에 달린 태그들'})
  @Column('simple-array')
  tags: string[];

  @ApiProperty({description:'포트폴리오에 달린 좋아요'})
  @Column()
  like: number;
  
}

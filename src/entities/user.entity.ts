import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Entity()
export class User {
  @PrimaryColumn()
  @ApiProperty({ description: '유저 아이디' })
  id: string;

  @ApiProperty({ description: '구글 로그인시 유저별 키' })
  @Column()
  sub: string;

  @ApiProperty({ description: '유저 이메일' })
  @Column()
  email: string;

  @ApiProperty({ description: '유저 이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '유저 프로필' })
  @Column()
  picture: string;

  @ApiProperty({ description: '유저 전공' })
  @Column('simple-array')
  major: string[];

  @ApiProperty({ description: '유저 자기소개' })
  @Column()
  introduce: string;

  @ApiProperty({ description: '포트폴리오 테이블' })
  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolio: Portfolio[];
}

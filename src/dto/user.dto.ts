import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UserDto {
  @ApiProperty({
    title:'사용자 이름',
    description: '사용자의 이름입니다',
    example: '변찬우',
  })
  @IsString()
  name: string;

  @ApiProperty({
    title:'사용자 이메일',
    description: '사용자의 이메일 입니다',
    example: 'chanwoo@teemolove.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    title:'사용자 고유 키',
    description: '사용자가 구글 로그인 할시 받는 고유키 입니다',
    example: '9reriqr1324234',
  })
  @IsString()
  sub: string;

  @ApiProperty({
    title:'사용자 프로필',
    description: '사용자의 프로필 사진 URL 입니다',
    example: 'http://chanwoo123.Teemosarang',
  })
  @IsUrl()
  picture: string;
}

export class User2 {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  sub: string;

  @IsString()
  picture: string;

  @IsString({ each: true })
  major: string[];

  @IsString()
  introduce: string;
}

export class registerDto {
  @ApiProperty({
    title:'회원가입시 사용자 토큰',
    description: '회원가입시 나오는 사용자의 토큰입니다',
    example: 'qweqweqeqwqwqqw',
  })
  @IsString()
  readonly TokenId: string;

  @ApiProperty({
    title:'회원가입시 사용자의  id',
    description: '회원가입시 사용자의 id 입니다',
    example: 'chanwoo123',
  })
  @IsString()
  id: string;
}

export class loginDto {
  @ApiProperty({
    title:'로그인시 사용자 토큰',
    description: '사용자가 로그인시 나오는 토큰입니다.',
    example: 'qqweqweqwewqeqwewqe',
  })
  @IsString()
  readonly TokenId: string;
}

export class userEditDto {

  @ApiProperty({
    title:'유저 전공',
    description: '사용자의 전공입니다',
    example: 'FrontEnd',
  })
  @IsOptional()
  @IsString({ each: true })
  major: string[];

  @ApiProperty({
    title:'유저 자기소개',
    description: '사용자의 간단한 자기소개 입니다',
    example: '안녕하세요 FrontEnd를 전공하고있는 변찬우 입니다.',
  })
  @IsOptional()
  @IsString()
  introduce: string;
}

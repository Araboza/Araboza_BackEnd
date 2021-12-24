import { IsOptional, IsString } from 'class-validator';

export class UserDto {
  name: string;
  email: string;
  sub: string;
  picture: string;
}

export class User2 {
  name: string;
  email: string;
  sub: string;
  picture: string;
  major: string[];
  introduce: string;
}

export class tokenDto {
  @IsString()
  readonly TokenId: string;
}

export class userEditDto {
  @IsOptional()
  @IsString({ each: true })
  major: string[];
  @IsOptional()
  @IsString()
  introduce: string;
}

import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  sub: string;

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

export class tokenDto {
  @IsString()
  readonly TokenId: string;

  @IsString()
  id: string;
}

export class userEditDto {
  @IsOptional()
  @IsString({ each: true })
  major: string[];

  @IsOptional()
  @IsString()
  introduce: string;
}

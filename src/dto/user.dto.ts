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

export class registerDto {
  @IsString()
  readonly TokenId: string;

  @IsString()
  id: string;
}

export class loginDto {
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

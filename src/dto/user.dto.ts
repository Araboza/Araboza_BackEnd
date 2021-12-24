import { IsString } from 'class-validator';

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
  @IsString({ each: true })
  readonly major: string[];
  @IsString()
  readonly introduce: string;
}

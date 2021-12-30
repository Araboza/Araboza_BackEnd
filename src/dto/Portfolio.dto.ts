import { IsString, IsArray } from 'class-validator';

export class PortfolioDTO {
  @IsString()
  title: string;

  @IsArray()
  tags: string[];

  @IsString()
  imgUrl: string;
}

export class PortfolioUpdateDTO {
  @IsString()
  title: string;

  @IsArray()
  tags: string[];

  @IsString()
  imgUrl: string;
}

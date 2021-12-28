import { IsString, IsNumber, IsArray } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class PortfolioDTO {
    
  @IsString()
  title: string;

  @IsArray()
  tags: string[];

  @IsNumber()
  like: number;

  @IsString()
  user: User;

  @IsString()
  imgUrl: string;
}

export class PortfolioUpdateDTO {
  @IsString()
  title: string;

  @IsArray()
  tags: string[];

  @IsNumber()
  like: number;

  @IsString()
  imgUrl: string;
}

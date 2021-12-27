import { IsString, IsNumber, IsArray } from 'class-validator';

export class PortfolioDTO {
    @IsNumber()
    id: number;
  
    @IsString()
    title: string;
  
    @IsString()
    sub: String;
  
    @IsArray()
    tags: string[];
  
    @IsNumber()
    like: number;
}
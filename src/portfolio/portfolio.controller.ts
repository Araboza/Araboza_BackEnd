import { Body, Controller, Get, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioDTO } from '../dto/Portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getAllPortfolio() {
    return this.portfolioService;
  }

  @Post()
  async postPortfolio(@Body() portfolio: PortfolioDTO) {
    await this.portfolioService.pushData(portfolio);
    return {
      statusCode: 201,
      message: '저장됨',
    };
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}
  @Get()
  async getPortfolio() {

  }
  @Post()
  async postPortfolio() {

  }
}

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioDTO, PortfolioUpdateDTO } from '../dto/Portfolio.dto';
import { User } from 'src/entities/user.entity';

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

  @Patch('/:user/:postName')
  async editPortfolio(
    @Param('user') user: User,
    @Param('postName') postName: string,
    @Body() UpdateData: PortfolioUpdateDTO,
  ) {
    this.portfolioService.updatePortfolio(user, postName, UpdateData);
  }
}

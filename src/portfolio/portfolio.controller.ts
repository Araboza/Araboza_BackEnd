import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioDTO, PortfolioUpdateDTO } from '../dto/Portfolio.dto';
import { User } from 'src/entities/user.entity';
import { Request } from 'express';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getAllPortfolio() {
    return this.portfolioService.getAllPortfolio();
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
  @Delete('/:user/:postName')
  async deletePortfolio(
    @Param('user') user: any,
    @Param('postName') postName: string,
    @Req() req: Request,
  ) {
    const token = req.cookies['access_token'];
    const result = await this.portfolioService.right(token, user,postName);
    //this.portfolioService.deletePortfolio(user, postName);
    console.log('data',result)
    if (true) return { message: 'done', status: 200 };
    else return { message: 'failed', status: 400 };
  }

  @Get('/:user/:postName')
  async findPortfolio(
    @Param('user') user: User,
    @Param('postName') postName: string,
  ) {
    const Userdata = this.portfolioService.findPortfolio(user, postName);
    return Userdata;
  }
}

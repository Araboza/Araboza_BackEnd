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
    return this.portfolioService;
  }

  @Post()
  async postPortfolio(@Body() portfolio: PortfolioDTO, @Req() req: Request) {
    const token = req.cookies['access_token'];
    const result = await this.portfolioService.makeportfolio(
      token,
      portfolio.title,
    );
    if (result) {
      await this.portfolioService.pushData(portfolio);
      return { message: 'done', status: 200 };
    } else return { message: 'failed', status: 400 };
  }

  @Patch('/:user/:postName')
  async editPortfolio(
    @Param('user') user: User,
    @Param('postName') postName: string,
    @Body() UpdateData: PortfolioUpdateDTO,
    @Req() req: Request,
  ) {
    const result = req.cookies['access_token'];
    if (result) {
      await this.portfolioService.updatePortfolio(user, postName, UpdateData);
      return { message: 'done', status: 200 };
    } else return { message: 'failed', status: 400 };
  }
  @Delete('/:user/:postName')
  async deletePortfolio(
    @Param('user') user: User,
    @Param('postName') postName: string,
    @Req() req: Request
  ) {
    const token = req.cookies['access_token'];
    const result = await this.portfolioService.rightDelete(token, user);
    if (result) {
      await this.portfolioService.deletePortfolio(user, postName);
      return { message: 'done', status: 200 };
    } else return { message: 'failed', status: 400 };
  }
  @Get('/:user/:postName')
  async findPortfolio(
    @Param('user') user: User,
    @Param('postName') postName: string,
  ) {
    const Userdata = await this.portfolioService.findPortfolio(user, postName);
    return Userdata;
  }
}

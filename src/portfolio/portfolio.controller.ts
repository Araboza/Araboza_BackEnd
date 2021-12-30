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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('PORTFOLIO')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiOperation({
    summary: '포트폴리오 가져오기',
    description: '모든 포트폴리오 가져오기',
  })
  @Get()
  async getAllPortfolio() {
    return this.portfolioService.getAllPortfolio();
  }

  @ApiOperation({
    summary: '포트폴리오 생성하기',
    description: '새로운 포트폴리오를 생성합니다',
  })
  @Post()
  async postPortfolio(@Body() portfolio: PortfolioDTO) {
    await this.portfolioService.pushData(portfolio);
    return {
      statusCode: 201,
      message: '저장됨',
    };
  }

  @ApiOperation({
    summary: '포트폴리오 수정하기',
    description: '포트폴리오를 수정합니다',
  })
  @Patch('/:user/:postName')
  async editPortfolio(
    @Param('user') user: User,
    @Param('postName') postName: string,
    @Body() UpdateData: PortfolioUpdateDTO,
  ) {
    this.portfolioService.updatePortfolio(user, postName, UpdateData);
  }

  @ApiOperation({
    summary: '포트폴리오 삭제하기',
    description: '포트폴리오를 삭제합니다',
  })
  @Delete('/:user/:postName')
  async deletePortfolio(
    @Param('user') user: any,
    @Param('postName') postName: string,
    @Req() req: Request,
  ) {
    const token = req.cookies['access_token'];
    const result = await this.portfolioService.right(token, user, postName);
    //this.portfolioService.deletePortfolio(user, postName);
    console.log('data', result);
    if (true) return { message: 'done', status: 200 };
    else return { message: 'failed', status: 400 };
  }

  @Get('/:user/:postName')
  async findPortfolio(
    @Param('user') user: User,
    @Param('postName') postName: string,
  ) {
    return this.portfolioService.findPortfolio(user, postName);
  }
}

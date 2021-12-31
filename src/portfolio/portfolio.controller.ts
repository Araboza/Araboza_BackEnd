import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
  async postPortfolio(@Body() portfolio: PortfolioDTO, @Req() req: Request) {
    const token = req.cookies['access_token'];
    const result = await this.portfolioService.rightMake(
      token,
      portfolio.title,
    );
    if (result) {
      await this.portfolioService.pushData(portfolio,token);
      return { message: 'done', status: 200 };
    } else return { message: 'failed', status: 400 };
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
    @Req() req: Request,
  ) {
    const token = req.cookies['access_token'];
    const result = await this.portfolioService.right(token, user);
    if (result) {
      await this.portfolioService.updatePortfolio(user, postName, UpdateData);
      return { message: 'done', status: 200 };
    } else return { message: 'failed', status: 400 };
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
    const result = await this.portfolioService.right(token, user);

    // 에러 처리

    if (result) return this.portfolioService.deletePortfolio(user, postName);


  }

  @Get('/:user/:postName')
  async findOnePortfolio(
    @Param('user') user: User,
    @Param('postName') postName: string,
    @Req() req: Request,
  ) {
    const token = req.cookies['access_token'];
    const result = await this.portfolioService.right(token, user);
    if (!result) throw new NotFoundException();
    return this.portfolioService.findOnePortfolio(user, postName);
  }
}

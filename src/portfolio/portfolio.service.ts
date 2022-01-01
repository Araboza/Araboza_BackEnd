import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioDTO, PortfolioUpdateDTO } from 'src/dto/Portfolio.dto';
import { Portfolio } from 'src/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly Portfolio: Repository<Portfolio>,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async getAllPortfolio() {
    return await this.Portfolio.query('select * from portfolio;');
  }

  async pushData(portfolio: PortfolioDTO, token: string) {
    const sub = await this.jwtService.decode(token);
    const user = await this.user.findOne({ sub: sub.sub });
    await this.Portfolio.save({ ...portfolio, user: user });
  }

  async updatePortfolio(
    user: User,
    title: string,
    UpdateData: PortfolioUpdateDTO,
  ) {
    await this.Portfolio.update(
      { user, title },
      {
        ...UpdateData,
      },
    );
  }

  async deletePortfolio(user: any, postName: string) {
    await this.Portfolio.delete({ user: user, title: postName });
    return { message: 'done', status: 200 };
  }

  async rightMake(token: string, postName: string): Promise<boolean> {
    const data = await this.jwtService.decode(token);
    const user: User = await this.user.findOne({ sub: data.sub });
    const portfolio = await this.Portfolio.findOne({
      user: user,
      title: postName,
    });
    if (portfolio) {
      return false;
    } else return true;
  }
  async right(
    token: string,
    user: User,
    postName: string,
  ): Promise<boolean> {
    const cookie = await this.jwtService.decode(token);
    const userData = await this.user.findOne({ sub: cookie.sub });
    const portfolioData = await this.Portfolio.findOne(
      {
        user: user,
        title: postName,
      },
      { relations: ['user'] },
    );
    if (portfolioData) {
      return userData.id == portfolioData.user.id;
    } else return false;
  }

  async findOnePortfolio(user, title) {
    return await this.Portfolio.findOne(
      { user, title },
      { relations: ['user'] },
    );
  }
}

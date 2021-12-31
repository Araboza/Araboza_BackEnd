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

  async pushData(portfolio: PortfolioDTO) {
    await this.Portfolio.save(portfolio);
  }

  async updatePortfolio(
    user: User,
    title: string,
    UpdateData: PortfolioUpdateDTO,
  ) {
    await this.Portfolio.update({user, title}, {
      ...UpdateData,
    });
  }

  async deletePortfolio(user: any, postName: string) {
    await this.Portfolio.delete({ user: user, title: postName });
    return { message: 'done', status: 200 };
  }

  async right(token: string, user: any) {
    const first = await this.jwtService.decode(token);
    const find = await this.user.findOne({ sub: first.sub });
    return find.id == user
  }

  async rightMake(token: string, postName: string) {
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

  async findOnePortfolio(user, title) {
    return await this.Portfolio.findOne(
      { user, title },
      { relations: ['user'] },
    );
  }
}

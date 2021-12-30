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
  
  async findPortfolio(user: User, postName: string) {
    return await this.Portfolio.findOne({ user: user, title: postName });
  }
  
  async pushData(portfolio: PortfolioDTO) {
    await this.Portfolio.save(portfolio);
  }
  
  async updatePortfolio(
    user: User,
    postName: string,
    UpdateData: PortfolioUpdateDTO,
  ) {
    const data = await this.Portfolio.findOne({ title: postName, user });
    await this.Portfolio.update(data.id, {
      ...UpdateData,
    });
  }

  async deletePortfolio(user: any, postName: string) {
    await this.Portfolio.delete({ user: user, title: postName });
    return { message: 'done', status: 200 };
  }
  
  async rightDelete(token: string, user: any) {
    const first = await this.jwtService.decode(token);
    const find = await this.user.findOne({ sub: first.sub });
    if (find.id == user) {
      return true;
    } else {
      return false;
    }
  }

  async makeportfolio(token: string, postName: string) {
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

  async findPortfolio(user, title) {
    return await this.Portfolio.findOne(
      { user, title },
      { relations: ['user'] },
    );
  }
}

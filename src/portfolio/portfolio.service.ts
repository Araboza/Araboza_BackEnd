import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioDTO, PortfolioUpdateDTO } from 'src/dto/Portfolio.dto';
import { Portfolio } from 'src/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly Portfolio: Repository<Portfolio>,
  ) {}

  async getAllPortfolio() {
    return await this.Portfolio.find();
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
    const data = await this.Portfolio.findOne({ title: postName, user: user });
    this.Portfolio.update(data.id, {
      ...UpdateData,
    });
  }
  async deletePortfolio(user: User, postName: string) {
    this.Portfolio.delete({ user: user, title: postName });
    return { message: 'done', status: 200 };
  }
}

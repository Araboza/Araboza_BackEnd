import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioDTO } from 'src/dto/Portfolio.dto';
import { Portfolio } from 'src/entities/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectRepository(Portfolio) private readonly Portfolio: Repository<Portfolio>
      ) {}
    async getAllPortfolio() {
        return await this.Portfolio.find();
    }
    async pushData(portfolio: PortfolioDTO) {
        await this.Portfolio.save(portfolio);
    }
}

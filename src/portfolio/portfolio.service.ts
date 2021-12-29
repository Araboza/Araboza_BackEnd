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
    const found = await this.Portfolio.find();
    return found;
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
  async deletePortfolio(user:any, postName: string) {
    console.log(user);
    this.Portfolio.delete({ user : user , title: postName});
    return { message: 'done', status: 200 };
  }
  async right(token: string, user: any ,postName:string) {
    const first = this.jwtService.decode(token);
    const find = await this.user.findOne({ sub: first.sub });
    if(find.id == user){
      this.deletePortfolio(user,postName)
    }
    else{
     return false
    }  
  }
  async findPortfolio(user,postName){

  }
}

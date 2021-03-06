import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioDTO, PortfolioUpdateDTO } from 'src/dto/Portfolio.dto';
import { Portfolio } from 'src/entities/portfolio.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EditUserDto } from 'src/dto/user.dto';
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
    return await this.Portfolio.query(
      'select * from portfolio order by id desc;',
    );
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

  async right(token: string, user: User, postName: string): Promise<boolean> {
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

  async rightEdit(
    token: string,
    user: User,
    postName: string,
    UpdateData: PortfolioUpdateDTO,
  ): Promise<boolean> {
    const cookie = await this.jwtService.decode(token);
    const userData: User = await this.user.findOne({ sub: cookie.sub });
    const portfolioData = await this.Portfolio.findOne(
      {
        user: user,
        title: postName,
      },
      { relations: ['user'] },
    );
    const UpportfolioData = await this.Portfolio.findOne({
      user: user,
      title: UpdateData.title,
    });
    if (portfolioData.user.id === userData.id) {
      if (UpportfolioData && UpportfolioData.id !== UpdateData.id)
        throw new HttpException('?????? ?????? ???????????????', 400);
      else return true;
    } else
      throw new HttpException('????????? ??????????????? ??????????????? ????????????', 400);
  }

  async findOnePortfolio(user, title) {
    return await this.Portfolio.findOne(
      { user, title },
      { relations: ['user'] },
    );
  }
  async like(user, postName, toggle) {
    const like = await this.Portfolio.findOne({ user: user, title: postName });
    console.log(toggle);
    if (toggle.toggle) {
      await this.Portfolio.update(
        { user: user, title: postName },
        { like: like.like + 1 },
      );
    } else {
      await this.Portfolio.update(
        { user: user, title: postName },
        { like: like.like <= 0 ? 0 : like.like - 1 },
      );
    }
  }
  async cookieUserfind(Token: string): Promise<string> {
    try {
      const verify = await this.jwtService.verify(Token, {
        secret: 'MYARABOZA1@3$',
      });
      return verify;
    } catch (error) {
      switch (error.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new HttpException('????????? ????????????', 400);

        case 'EXPIRED_TOKEN':
          throw new HttpException('????????? ?????????????????????.', 401);

        default:
          throw new HttpException('?????? ???????????????.', 500);
      }
    }
  }
  async findOtherUser(user: string) {
    const userData = await this.user.findOne(
      { id: user },
      { relations: ['portfolio'] },
    );
    return userData;
  }

  async userEdit(UserData: EditUserDto, cookie: string) {
    const token = this.jwtService.decode(cookie);
    this.user.update(token.sub, {
      ...UserData,
    });
  }
}

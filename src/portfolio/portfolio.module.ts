import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from 'src/entities/portfolio.entity';
import { User } from 'src/entities/user.entity';
import { jwtConstants } from 'src/user/constants';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio, User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}

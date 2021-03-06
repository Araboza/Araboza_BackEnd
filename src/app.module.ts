import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { Portfolio } from './entities/portfolio.entity';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Portfolio],
      synchronize: true,
    }),
    UserModule,
    PortfolioModule,
  ],
})
export class AppModule {}

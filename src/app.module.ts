import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  controllers: [AppController],
  providers : [AppService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
})
export class AppModule {}

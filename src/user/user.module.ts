import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),

	],
	exports: [UserService],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule{}
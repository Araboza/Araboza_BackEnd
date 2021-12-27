import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { userEditDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private jwtService: JwtService,
  ) {}
  
  getUser(sub: string) {
    const user = this.user.findOne({ sub: sub });
    return user;
  }

  async pushData(User): Promise<string> {
    const UserInfo: any = this.jwtService.decode(User.TokenId);

    const user = await this.user.findOne({ sub: UserInfo.sub });

    if (user) {
      await this.user.update(UserInfo.sub, {
        email: UserInfo.email,
        name: UserInfo.name,
        picture: UserInfo.picture,
      });
    } else {
      await this.user.save(
        this.user.create({
          sub: UserInfo.sub,
          email: UserInfo.email,
          name: UserInfo.name,
          picture: UserInfo.picture,
        }),
      );
    }
    return UserInfo.sub;
  }

  async userEdit(data: userEditDto, cookie: string) {
    console.log(data);
    const Token = await this.jwtService.decode(cookie);
    //console.log(Token.sub)
    this.user.update(Token.sub, {
      ...data,
    });
  }
}

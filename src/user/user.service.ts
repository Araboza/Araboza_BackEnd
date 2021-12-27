import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { userEditDto } from 'src/dto/user.dto';

type Tlqejr = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
};

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
    const UserInfo = this.jwtService.decode(User.TokenId) as Tlqejr;

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
          id: User.id,
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
    const Token = await this.jwtService.decode(cookie);
    this.user.update(Token.sub, {
      ...data,
    });
  }
}

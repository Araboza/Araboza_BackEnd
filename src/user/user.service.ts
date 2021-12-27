import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { tokenDto, userEditDto } from 'src/dto/user.dto';

type TToken = {
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

  async login(User: tokenDto) {
    const UserData = this.jwtService.decode(User.TokenId) as TToken;
    const result = this.user.findOne({ sub: UserData.sub });
    if (!result) throw new BadRequestException();

    return result;
  }

  async register(User): Promise<string> {
    const UserData = this.jwtService.decode(User.TokenId) as TToken;

    const user = await this.user.findOne({ sub: UserData.sub });

    if (user) throw new BadRequestException();

    await this.user.save(
      this.user.create({
        id: User.id,
        sub: UserData.sub,
        email: UserData.email,
        name: UserData.name,
        picture: UserData.picture,
      }),
    );

    return UserData.sub;
  }

  async userEdit(data: userEditDto, cookie: string) {
    const Token = await this.jwtService.decode(cookie);
    this.user.update(Token.sub, {
      ...data,
    });
  }
}

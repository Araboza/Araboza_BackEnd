import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { loginDto, registerDto, userEditDto } from 'src/dto/user.dto';

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

  async getUser(id: string) {
    const { sub, ...user } = await this.user.findOne({ id });
    return user;
  }

  async login(User: loginDto) {
    const UserData = (await this.jwtService.decode(User.TokenId)) as TToken;
    const result = await this.user.findOne({ sub: UserData.sub });

    if (!result) throw new BadRequestException();

    return result;
  }

  async register(User: registerDto): Promise<void> {
    const UserData = this.jwtService.decode(User.TokenId) as TToken;

    const subCompare = await this.user.findOne({ sub: UserData.sub });

    if (subCompare) throw new ConflictException();

    const idCompare = await this.user.findOne({ id: User.id });

    if (idCompare) throw new ForbiddenException();

    await this.user.save(
      this.user.create({
        id: User.id,
        sub: UserData.sub,
        email: UserData.email,
        name: UserData.name,
        picture: UserData.picture,
      }),
    );
  }

  async userEdit(data: userEditDto, cookie: string) {
    const Token = await this.jwtService.decode(cookie);
    this.user.update(Token.sub, {
      ...data,
    });
  }
}

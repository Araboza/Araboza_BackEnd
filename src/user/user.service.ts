import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, User2 } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private jwtService: JwtService,
  ) {}
  getUser(sub: string): User2 {
    const user = this.user.findOne({ sub: sub });

    return;
  }

  async pushData(User) {
    //console.log(User);
    const UserAll: any = this.jwtService.decode(User.TokenId);
    console.log(UserAll);
    const user = await this.user.findOne({ sub: UserAll.sub });
    console.log(user);
    //console.log(user);
    if (user) {
      console.log('이미있슴!! 그러니 업데이트함!');
      return await this.user.update(UserAll.sub, {
        email: UserAll.email,
        name: UserAll.name,
        picture: UserAll.picture,
        major: User.major,
        introduce: User.introduce,
      });
    } else {
      return await this.user.save(
        this.user.create({
          sub: UserAll.sub,
          email: UserAll.email,
          name: UserAll.name,
          picture: UserAll.picture,
          major: User.major,
          introduce: User.introduce,
        }),
      );
    }
  }
}

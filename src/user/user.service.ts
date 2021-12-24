import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { throws } from 'assert';
import { User2 } from 'src/dto/user.dto';

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
    //console.log(User);
    const UserAll: any = this.jwtService.decode(User.TokenId);
    console.log(UserAll);
    const user = await this.user.findOne({ sub: UserAll.sub });
    console.log("여긴 함수",user);
    if (user) {
      console.log('이미있슴!! 그러니 업데이트함!');
      await this.user.update(UserAll.sub, {
        sub: UserAll.sub,
        email: UserAll.email,
        name: UserAll.name,
        picture: UserAll.picture,
        major: User.major,
        introduce: User.introduce,
      });
    } else {
      await this.user.save(
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
    return UserAll.sub;
  }

 

 
}

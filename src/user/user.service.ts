import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import jwt_decode from 'jwt-decode';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}
  getUser(id: number): any {}
  async pushData(User: any) {
    //console.log(User);
    const UserAll: any = this.decoding(User);
    console.log(UserAll);
    const user = await this.user.findOne({ sub: UserAll.sub });
    console.log(user);
    //console.log(user);
    if (user) {
      console.log('이미있슴!!');
      return await this.user.update(UserAll.sub,{
        email: UserAll.email,
        name: UserAll.name,
        picture: UserAll.picture,
      });
    } else {
      return await this.user.save(
        this.user.create({
          sub: UserAll.sub,
          email: UserAll.email,
          name: UserAll.name,
          picture: UserAll.picture,
        }),
      );
    }
  }
  decoding(Token) {
    //console.log(Token)
    let decoded = jwt_decode(Token.TokenId);
    return decoded;
  }

}

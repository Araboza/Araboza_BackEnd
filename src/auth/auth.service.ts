import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async login(Token: string) {
    //만료일

    const jwt = await this.jwtService.decode(Token);
    console.log(jwt);
    // return { access_token: this.jwtService.sign(payload) };
  }
}

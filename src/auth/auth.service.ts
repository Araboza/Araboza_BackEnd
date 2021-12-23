import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private readonly userservice: UserService;
  async login(id: number) {
    const expire_date = moment().add(3, 'hour');
    const user = this.userservice.getUser(id);
    const payload = {
      id: id,
      expire_at: expire_date,
      email: user.email,
      picture: user.picture,
      sub: user.sub,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}

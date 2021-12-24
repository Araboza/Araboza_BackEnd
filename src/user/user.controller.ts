import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { tokenDto, UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,
    private jwtService: JwtService) {}
  @Post('/login')
  async GetToken(@Body() User: tokenDto) {
    console.log('hi', User);
    const sub:string = await this.userService.pushData(User);
    //console.log(sub)
    const user = await this.userService.getUser(sub);
    console.log(user);
    return {
      access_token: this.jwtService.sign({ 'sub' : user.sub})
    };
  }
}

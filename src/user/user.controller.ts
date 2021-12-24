import { Body, Controller, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { tokenDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('/login')
  async GetToken(@Body() User: tokenDto, @Res() res: Response) {
    console.log('hi', User);
    const sub: string = await this.userService.pushData(User);
    //console.log(sub)
    const user = await this.userService.getUser(sub);

    res.cookie('access_token', this.jwtService.sign({ sub: user.sub }));
    res.send();
  }
}

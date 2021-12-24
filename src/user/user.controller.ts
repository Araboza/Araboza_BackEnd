import { Body, Controller, Post, Put, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { tokenDto, userEditDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async GetToken(@Body() User: tokenDto, @Res() res: Response) {
    const sub: string = await this.userService.pushData(User);

    const user = await this.userService.getUser(sub);

    res.cookie('access_token', this.jwtService.sign({ sub: user.sub }));
    res.send();
  }

  @Post('/edit')
  async profileEdit(@Body() data: userEditDto, @Req() req: Request) {
    this.userService.userEdit(data, req.cookies['access_token']);
  }

  @Put('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.send('fuck');
  }
}

import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  private users: User[] = [];
  getHello(): string {
    return 'Hello World!';
  }
  DataIn(UserData) {
    this.users.push({
      ...UserData,
    });
  }
  Decode(): any {}
  getData(): User[] {
    return this.users;
  }
}

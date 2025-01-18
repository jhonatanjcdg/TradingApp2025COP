import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<div>Hola mundo desde el bakcend</div>';
  }
}

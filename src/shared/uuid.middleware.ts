import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate as uuidValidate } from 'uuid';
import { ErrorResponseMessage } from './error.interface';

@Injectable()
export class UuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!uuidValidate(req.params.id) && req.params.model !== 'favs') {
      throw new HttpException(
        ErrorResponseMessage.USER_ID_IS_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }
    next();
  }
}

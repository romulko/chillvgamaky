import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const ctx = GqlExecutionContext.create(context).getContext();
    //
    // if (validateHeader(ctx.headers.authorization)) {
    //   ctx.user = this.validateToken(ctx.headers.authorization);
    // }

    return next.handle();
  }

  // validateToken(auth: string) {
  //   const token = auth.split(' ')[1];
  //
  //   try {
  //     return jwt.verify(token, 'secret');
  //   } catch (err) {
  //     console.error('Token error: ' + (err.message || err.name));
  //   }
  // }
}

// const validateHeader = (authorizationHeader: string) =>
//   authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer';

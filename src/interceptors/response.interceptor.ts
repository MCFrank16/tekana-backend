import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class ResponseInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const response = context.switchToHttp().getResponse();
                if (response instanceof HttpException) {
                    console.log('we are here')
                    return {
                        status: response.getStatus(), // Use the HTTP status code
                        message: 'Custom message',
                        data,
                    };
                } else {
                    return {
                        status: HttpStatus.OK,
                        data,
                    };
                }
            })
        )
    }
}
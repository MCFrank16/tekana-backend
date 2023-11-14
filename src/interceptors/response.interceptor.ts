import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class ResponseInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return {
                    status: HttpStatus.OK,
                    data,
                };
            })
        )
    }
}
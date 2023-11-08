import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from 'express';
import { HTTP_STATUS_MESSAGES } from "constants/http-response";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionMessage = exception.message;

        response
            .status(status)
            .json({
                statusCode: status,
                message: exceptionMessage
            })
    }
}

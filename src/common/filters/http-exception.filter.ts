import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'FAILURE_RESPONSE';
    let details: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message || message;
      details = typeof res === 'object' ? res : undefined;
    } else if (exception && typeof exception === 'object') {
      message = (exception as any).message || message;
    }

    response.status(status).json({
      status: 'FAILURE',
      message,
      path: request?.url,
      timestamp: new Date().toISOString(),
      details,
    });
  }
}



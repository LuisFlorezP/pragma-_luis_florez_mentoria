import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, path, body, params, query } = request;
    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;
    
    const now = Date.now();
    
    this.logger.log(
      `Request: ${method} ${path} - UserAgent: ${userAgent} - IP: ${ip}`
    );

    if (Object.keys(body).length > 0) {
      this.logger.debug(`Body: ${JSON.stringify(body)}`);
    }
    if (Object.keys(params).length > 0) {
      this.logger.debug(`Params: ${JSON.stringify(params)}`);
    }
    if (Object.keys(query).length > 0) {
      this.logger.debug(`Query: ${JSON.stringify(query)}`);
    }

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.logger.log(
            `Response: ${method} ${path} - ${Date.now() - now}ms`
          );
          this.logger.debug(`Response data: ${JSON.stringify(data)}`);
        },
        error: (error) => {
          this.logger.error(
            `Error in ${method} ${path} - ${Date.now() - now}ms`,
            error.stack
          );
        },
      }),
    );
  }
}
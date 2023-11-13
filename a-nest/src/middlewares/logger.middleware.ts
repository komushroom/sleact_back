import { Injectable,Logger, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from 'express';
// import { request } from "http";
// import { userInfo } from "os";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger ('HTTP');

    //미들웨어 
    use(request: Request,response:Response, next: NextFunction): void{
        const { ip,method,originalUrl} = request;
        const userAgent = request.get('user-agent') || '';

    response.on('finish',()=>{
        const{ statusCode} = response;
        const contentLength = response.get('content-length');
        this.logger.log(
            `${method} ${originalUrl}${statusCode}${contentLength} - ${userAgent}  ${ip}`,
        );
    });
    next();
}
}
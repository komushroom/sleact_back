import { Injectable ,NestInterceptor,ExecutionContext,CallHandler} from "@nestjs/common";
import { Observable } from 'rxjs';
import  {map}  from "rxjs/operators";

@Injectable ()
export class UndfinedToNullInterceptor implements NestInterceptor {
    intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        //전 부분
        return next
        .handle()
        .pipe(map((data)=>(data ===  undefined ? null :data )));
    } 
}

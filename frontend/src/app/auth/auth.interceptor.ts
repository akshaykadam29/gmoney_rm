import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from 'rxjs/operators';
import { LoginService } from "../services/login.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService : LoginService, private router : Router){}
    
    intercept(req : HttpRequest<any>, next : HttpHandler){
        if(req.headers.get('NoAuth')){
            return next.handle(req.clone());
        }else{
            const clonereq = req.clone({
                headers : req.headers.set("Authorization", "Bearer " + this.loginService.getToken())
            });
            return next.handle(clonereq).pipe(
                tap(
                    event => { },
                    err => {
                        if(err.error.auth == false){
                            this.router.navigateByUrl('/login');
                        }
                    }
                )
            )
        }
    }
}
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserEntity } from '../entities/UserEntity';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService {

    constructor(
        private injector: Injector
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authService = this.injector.get(AuthService);
        let key: string = authService.getKey();
        
        const headers = req.clone({
            headers: req.headers.set('Authorization', 'Basic '+key)
        });
        
        return next.handle(headers);
    }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from "rxjs/operators";
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService {
    user = new BehaviorSubject<string>(null);
    timer: any;

    constructor(private http: HttpClient, private router: Router) {}

    login(login: string, pwd: string) {
        return this.http.get<User>('http://localhost/recipes/login.php',
            {
                params: new HttpParams().set('q', "SELECT login FROM login WHERE login = '" + login + "' AND pwd = '" + pwd + "'")
            }
            ).pipe(tap(resData => {
                this.user.next(resData.login);
                localStorage.setItem('user', JSON.stringify(resData.login));
                this.autoLogout();
            }))
    }

    autoLogin() {
        const userLogin = JSON.parse(localStorage.getItem('user'));
        console.log(userLogin);
        if (!userLogin) {
            return;
        } else {
            this.user.next(userLogin);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('user');
    }

    autoLogout() {
        this.timer = setTimeout(() => {
            this.logout();
        }, 3600 * 1000);
    }
}
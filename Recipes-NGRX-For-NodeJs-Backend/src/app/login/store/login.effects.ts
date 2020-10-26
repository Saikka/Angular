import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';

import * as LoginActions from './login.actions';
import { LoginService } from '../login.service';
import { User } from '../../models/user.model';

export interface ResData {
    id?: string;
    token?: string;
    message: string;
}

@Injectable()
export class LoginEffects {

    @Effect()
    signup = this.actions$.pipe(
        ofType(LoginActions.SIGNUP_START),
        switchMap((actionData: LoginActions.SignupStart) => {
            return this.http.put('http://localhost:8080/auth/signup', JSON.stringify(actionData.payload), 
            {
                headers: new HttpHeaders({'Content-Type':'application/json'})
            })
            .pipe(
                map(() => {
                    return new LoginActions.SignupSuccess({redirect: true, isLogin: false});
                }),
                catchError(error => {
                    return of(new LoginActions.AuthFail(error.error.message));
                })
            )
        }),
    );

    @Effect()
    login = this.actions$.pipe(
        ofType(LoginActions.LOGIN_START),
        switchMap((actionData: LoginActions.LoginStart) => {
            return this.http.post('http://localhost:8080/auth/login', JSON.stringify(actionData.payload), 
            {
                headers: new HttpHeaders({'Content-Type':'application/json'})
            })
            .pipe(
                tap(() => {
                    this.loginService.setTimer();
                }),
                map((resData: ResData) => {
                    const user = new User(resData.id, resData.token);
                    localStorage.setItem('userData', JSON.stringify(user));
                    return new LoginActions.LoginSuccess({user: user, redirect: true, isLogin: true});
                }),
                catchError(error => {
                    return of(new LoginActions.AuthFail(error.error.message));
                })
            );
        })
    );

    @Effect({dispatch: false})
    logout = this.actions$.pipe(
        ofType(LoginActions.LOGOUT),
        tap(() => {
            localStorage.removeItem('userData');
            this.router.navigate(['/auth/login']);
            this.loginService.clearTimer();
        })
    )

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(LoginActions.AUTO_LOGIN),
        map(() => {      
            const userData: {
                _id: string,
                token: string;
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'BOO' }
            } else {
                this.loginService.setTimer();
                return new LoginActions.LoginSuccess({user: userData, redirect: false, isLogin: true});
            }
        })
    );

    @Effect({dispatch: false})
    redirect = this.actions$.pipe(
        ofType(LoginActions.LOGIN_SUCCESS, LoginActions.SIGNUP_SUCCESS),
        tap((data: LoginActions.LoginSuccess | LoginActions.SignupSuccess) => {
            if (data.payload.redirect && data.payload.isLogin) {
                this.router.navigate(['/']);
            }
            if (data.payload.redirect && !data.payload.isLogin) {
                this.router.navigate(['/auth/login']);
            }
        })
    )

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private router: Router,
        private loginService: LoginService) {}
}
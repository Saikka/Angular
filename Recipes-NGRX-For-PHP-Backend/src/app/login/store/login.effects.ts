import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as LoginActions from './login.actions';
import { User } from '../../models/user.model';
import { LoginService } from '../login.service';

export interface ResData {
  login?: string;
  token?: string;
  message: string;
}

@Injectable()
export class LoginEffects {
  @Effect()
  signup = this.actions$.pipe(
    ofType(LoginActions.SIGNUP_START),
    switchMap((actionData: LoginActions.SignupStart) => {
      return this.http
        .put('http://localhost/recipes/signup.php', actionData.payload)
        .pipe(
          map(() => {
            return new LoginActions.SignupSuccess({
              redirect: true,
              isLogin: false,
            });
          }),
          catchError((error) => {
            return of(new LoginActions.AuthFail(error.error));
          })
        );
    })
  );

  @Effect()
  login = this.actions$.pipe(
    ofType(LoginActions.LOGIN_START),
    switchMap((actionData: LoginActions.LoginStart) => {
      return this.http
        .post('http://localhost/recipes/login.php', actionData.payload)
        .pipe(
          tap(() => {
            this.loginService.setTimer();
          }),
          map((resData: ResData) => {
            const user = new User(resData.login, resData.token);
            localStorage.setItem('user', JSON.stringify(user));
            return new LoginActions.LoginSuccess({
              user: user,
              redirect: true,
              isLogin: true,
            });
          }),
          catchError((error) => {
            return of(new LoginActions.AuthFail(error.error));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType(LoginActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
      this.loginService.clearTimer();
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(LoginActions.AUTO_LOGIN),
    map(() => {
      if (!JSON.parse(localStorage.getItem('user'))) {
        return { type: 'BOO' };
      } else {
        const user = JSON.parse(localStorage.getItem('user'));
        this.loginService.setTimer();
        return new LoginActions.LoginSuccess({
          user: user,
          redirect: true,
          isLogin: true,
        });
      }
    })
  );

  @Effect({ dispatch: false })
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
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}
}

import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const SIGNUP_START = '[Login] Signup Start';
export const SIGNUP_SUCCESS = '[Login] Signup Success';
export const LOGIN_START = '[Login] Login Start';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const AUTH_FAIL = '[Login] Auth Fail';
export const AUTO_LOGIN = '[Login] Auto Login';
export const LOGOUT = '[Login] Logout';
export const CLEAR_ERROR = '[Login] Clear Error';

export class SignupStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: {login: string, pwd: string, pwd_confirm: string}) {}
}

export class SignupSuccess implements Action {
    readonly type = SIGNUP_SUCCESS;

    constructor(public payload: { redirect: boolean, isLogin: boolean }) {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {login: string, pwd: string}) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: { user: User, redirect: boolean, isLogin: boolean }) {}
}

export class AuthFail implements Action {
    readonly type = AUTH_FAIL;

    constructor(public payload: string) {}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type LoginActions =
| SignupStart
| SignupSuccess
| LoginStart
| LoginSuccess
| AuthFail
| AutoLogin
| Logout
| ClearError;
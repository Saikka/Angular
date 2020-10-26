import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.store.select('login').pipe(
            take(1),
            map(state => {
                return state.user
            }),
            map(user => {
                const isLogin = !!user;
                if (isLogin) {
                    return true;
                }
                return this.router.createUrlTree(['/auth/login']);
            })
        )
    }
}
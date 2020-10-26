import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as LoginActions from './store/login.actions';

@Injectable({providedIn: 'root'})
export class LoginService {
    timer: any;

    constructor(private store: Store<fromApp.AppState>) {}

    setTimer() {
        this.timer = setTimeout(() => {
            this.store.dispatch(new LoginActions.Logout());
        }, 3600 * 1000);
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

}
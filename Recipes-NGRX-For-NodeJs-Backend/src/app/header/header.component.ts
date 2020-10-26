import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as LoginActions from '../login/store/login.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin = false;
  userSubs: Subscription;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.userSubs = this.store.select('login').subscribe(loginState => {
      this.isLogin = !!loginState.user;
    })
  }

  onLogin() {
    this.store.dispatch(new LoginActions.ClearError());
    this.router.navigate(['./auth/login']);
  }

  onSignup() {
    this.store.dispatch(new LoginActions.ClearError());
    this.router.navigate(['./auth/signup']);
  }

  onLogout() {
    this.store.dispatch(new LoginActions.Logout());
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}

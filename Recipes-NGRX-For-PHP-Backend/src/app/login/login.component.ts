import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as LoginActions from './store/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = false;
  message: string = null;
  error: string = null;
  storeSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['loginorsignup'] === 'login') {
        this.login = true;
      }
      else {
        this.login = false;
      }
      this.storeSub = this.store.select('login').subscribe(loginState => {
        this.message = loginState.message;
        this.error = loginState.error;
      })
    })
  }

  onSubmit(form: NgForm) {
    if (!this.login) {
      this.store.dispatch(new LoginActions.SignupStart({
        login: form.value.login, 
        pwd: form.value.password, 
        pwd_confirm: form.value.password_confirm
      }));
    } else {
      this.store.dispatch(new LoginActions.LoginStart({login: form.value.login, pwd: form.value.password}));
    }
    form.reset();
  }

  onCancel() {
    this.store.dispatch(new LoginActions.ClearError());
    this.router.navigate(['/recipes']);
  }

}

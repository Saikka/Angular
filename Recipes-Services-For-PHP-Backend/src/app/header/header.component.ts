import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogin = false;
  userSubs: Subscription;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.userSubs = this.loginService.user.subscribe(user => {
      this.isLogin = !!user;
    })

  }

  onLogout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}

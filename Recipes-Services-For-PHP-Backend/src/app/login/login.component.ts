import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = null;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loginService.login(form.value.login, form.value.password).subscribe(
      resData => {
        this.router.navigate(['/recipes']);
      }, error => {
        this.error = 'Wrong login or password!';
      }
    );
    form.reset();
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

}

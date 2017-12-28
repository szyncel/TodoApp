import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }


  submit(form) {
    const user = new User(
      form.value.email,
      form.value.password);
    //console.log(form.value);
    this.authService.signup(user)
      .subscribe(
      res => console.log(res),
      error => console.log(error.error)
      );
  }

}

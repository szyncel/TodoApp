import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }


  login(form) {
    const user = new User(
      form.value.email,
      form.value.password);
    //console.log(form.value);
    this.authService.signin(user)
      .subscribe((res) => {
        if (res) {
          let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        } else {
          console.log('Nieudane logowanie');
        }
        //console.log(data.body.token);
        // console.log(data.headers.get('x-auth'));
      })
  }

}

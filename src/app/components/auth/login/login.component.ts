import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import {User} from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm;
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) 
  {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnInit(){
    
  }

  onLogin(value : User){
    this._authService.loginWithEmail(value)
    .then( res => {
      console.log('success', res);
      this._router.navigate(['/']);
    })
    .catch( err => {
      console.log(err);
    })
  }

}

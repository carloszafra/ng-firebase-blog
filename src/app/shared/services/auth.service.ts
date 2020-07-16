import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<firebase.User>

  constructor(
   private fireAuth : AngularFireAuth
  ) 
  {
    this.userData = fireAuth.authState
  }

  loginWithEmail(user: User){
    const { email, password } = user;
    return this.fireAuth.signInWithEmailAndPassword(email, password);
   
  }

  logout(){
    this.fireAuth.signOut();
  }
}

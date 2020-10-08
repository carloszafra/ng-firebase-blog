import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { fileInterface } from '../models/file.interface';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public userData$: Observable<firebase.User>
  private filePath: string;
  private downloadURL: Observable<string>
  

  constructor(
   private fireAuth : AngularFireAuth,
   private fireStorage : AngularFireStorage
  ) 
  {
    this.userData$ = fireAuth.authState
  }

  loginWithEmail(user: User){
    const { email, password } = user;
    return this.fireAuth.signInWithEmailAndPassword(email, password);
   
  }


  logout(){
    this.fireAuth.signOut();
  }

  async saveUserProfile(user: User):Promise<any>{
    (await this.fireAuth.currentUser).updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    })
    .then(() => console.log('user updated'))
    .catch(err => console.log(err))
  }

  preUpdateProfile(user: User, image?: fileInterface):void {
    if(image){
      this.uploadImage(user, image);
    }else{
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: User, image: fileInterface){
    this.filePath = `images/${image.name}`;
    const fileRef = this.fireStorage.ref(this.filePath);
    const task = this.fireStorage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( urlImage => {
          user.photoURL = urlImage;
          this.saveUserProfile(user)
        })
      })
    ).subscribe();
  }
}

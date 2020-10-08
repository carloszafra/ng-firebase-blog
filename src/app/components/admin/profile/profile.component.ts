import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { User} from '../../../shared/models/user.interface';
import { fileInterface } from 'src/app/shared/models/file.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm;
  public image: fileInterface;
  public currentImage: string = "../../../../assets/28.jpg";
  

  constructor(private _authService: AuthService) {
    this.profileForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl({value: '', disable: true}, Validators.required),
      photoURL: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this._authService.userData$.subscribe(user =>{
      this.initValueForm(user)
    })
  }

  private initValueForm(user: User):void{
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }
 
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email      
    })
  }

  public onSaveUser(data: User){
    this._authService.preUpdateProfile(data, this.image);
  }

  handleImage(event: any):void{
    this.image = event.target.files[0];
  }

}

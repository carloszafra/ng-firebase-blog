import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { postInterface } from '../../../shared/models/post.interface';
import { PostService } from '../post.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit { 
  public newPostForm;
  private image: any;

  constructor( private _postService: PostService) { 
    this.newPostForm = new FormGroup({
      postTitle: new FormControl('', Validators.required),
      postContent: new FormControl('', Validators.required),
      postTags: new FormControl('', Validators.required),
      postImage: new FormControl('', Validators.required)
    })
  }


  ngOnInit(): void {
  }

  addNewPost(data: postInterface){
    this._postService.preAddUpatePost(data, this.image);
  }

  handleImage(event: any):void{
    this.image = event.target.files[0];
    console.log(this.image);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { postInterface } from '../../../shared/models/post.interface';
import{ PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  public editPostForm;
  private image: any;
  private imageOriginal: any;
 
  @Input() post: postInterface

  constructor(private _postService: PostService)
  { 
    this.editPostForm = new FormGroup({
      id: new FormControl('', Validators.required),
      postTitle: new FormControl('', Validators.required),
      postContent: new FormControl('', Validators.required),
      postTags: new FormControl('', Validators.required),
      postImage: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    console.log(this.post);
    this.image = this.post.postImage;
    this.imageOriginal = this.post.postImage;
    this.initValueForm();
  }

  editPost(post: postInterface){
    if(this.image == this.imageOriginal){
      post.postImage = this.imageOriginal;

      //call method(post)
      this._postService.editPostById(post);
    }else{
      //call method (post, image)
      this._postService.editPostById(post, this.image);
    }
  }

  handleImage(event: any):void {
    this.image = event.target.files[0];
  }
  
  private initValueForm():void {
    this.editPostForm.patchValue({
      id: this.post.id,
      postTitle: this.post.postTitle,
      postContent: this.post.postContent,
      postTags: this.post.postTags
    })
  }
}

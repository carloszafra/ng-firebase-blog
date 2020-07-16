import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../post.service'
import { postInterface } from 'src/app/shared/models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public post$ : Observable<postInterface>
  
     
  constructor(
    private _route : ActivatedRoute,
    private _postService : PostService
  ) 
  { }

  ngOnInit() {
   const postId = this._route.snapshot.params.id; //recuperamos el postid de la url 
   this.post$ = this._postService.getOnePost(postId);
  }

}

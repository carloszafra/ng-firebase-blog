import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import {PostService} from '../../posts/post.service';
import {postInterface} from '../../../shared/models/post.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts$ : Observable<postInterface[]>

  constructor(
   private _postService: PostService
  ) 
  { }

  ngOnInit() {
    this.posts$ = this._postService.getAllPosts();
  }

}

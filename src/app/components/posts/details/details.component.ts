import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { postInterface } from '../../../shared/models/post.interface';
import {PostService} from '../post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public post$: Observable<postInterface>;

  constructor(
    private _route: ActivatedRoute,
    private _postService: PostService
  ) 
  { }

  ngOnInit(): void {
    const postId = this._route.snapshot.params.id;
    this.post$ = this._postService.getOnePost(postId);
  }

}

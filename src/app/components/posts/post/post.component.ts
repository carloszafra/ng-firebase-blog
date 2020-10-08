import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../posts/post.service';
import {postInterface} from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit { 
     
  
  @Input() post: postInterface;

  constructor(
    private _postService: PostService
  ) 
  { }

  ngOnInit() {
    
  }

}

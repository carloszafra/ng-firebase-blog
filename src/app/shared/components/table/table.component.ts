import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { PostService } from '../../../components/posts/post.service'
import { postInterface } from '../../models/post.interface';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/components/modal/modal.component'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {
  

  displayedColumns: string[] = ['postTitle', 'postTags', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _postService: PostService, public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this._postService.getAllPosts().subscribe(
      res=>{
        console.log(res);
        this.dataSource.data =res;
      },
      err =>{
        console.log(err);
      }
    )
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
   
  onDeletePost( post: postInterface){
    console.log(post);
    Swal.fire({
      title: 'Are you sure',
      text: "you won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result =>{
      if (result.value){
        this._postService.deletePostById(post).then( ()=>{
          Swal.fire('deleted', 'your post has been deleted', 'success');
        })
        .catch( (error) =>{
          Swal.fire('Error', 'there was a problem connecting with the server', 'error');
        })
        
      }
    })
  }

  onEditPost( post: postInterface ){
    console.log(post);
    this.openDialog(post)
  }

  newPost(){
    this.openDialog();  
  }

  openDialog(post?: postInterface):void{
    const config = {
      data: {
        message: post ? 'Edit post' : 'New post', //ternario para saber si es un nuevo post o un edit
        content: post
      }
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(
      result =>{
        console.log(`dialog result ${result}`);
        
      }
    )
  }
}


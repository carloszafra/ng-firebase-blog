import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import { MaterialModule } from '../../../material.module'
import { TableComponent } from '../../../shared/components/table/table.component'


@NgModule({
  declarations: [PostListComponent, TableComponent],
  imports: [
    CommonModule,
    PostListRoutingModule,
    MaterialModule
  ]
})
export class PostListModule { }

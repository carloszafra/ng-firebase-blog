import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ AuthGuard } from '../../shared/guards/auth.guard';


import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, //admin
    canActivate: [AuthGuard],
    children: [
      {path: 'posts', loadChildren: ()=> import ('../posts/post-list/post-list.module').then(m => m.PostListModule)},
      {path: 'profile', loadChildren: ()=> import ('../admin/profile/profile.module').then(m => m.ProfileModule)}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

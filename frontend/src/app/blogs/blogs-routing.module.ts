import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
const routes: Routes = [
  {
    path: '',
    component: BlogPageComponent
  },
  {
    path: '/addBlog',
    component: AddBlogComponent
  }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BlogsRoutingModule { }

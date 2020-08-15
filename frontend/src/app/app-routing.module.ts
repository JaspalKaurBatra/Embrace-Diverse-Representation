import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
	  path: '',
	  loadChildren: () =>
		import('./blogs/blogs.module').then(
		  (m) => m.BlogsModule
		),
	},
	{
		path: 'blogs',
		loadChildren: () =>
		  import('./blogs/blogs.module').then(
			(m) => m.BlogsModule
		  ),
	  },
	{ path: '',   redirectTo: '/home', pathMatch: 'full' }
  ];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }

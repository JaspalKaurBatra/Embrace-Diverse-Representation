import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
	  path: '',
	  loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
	},
	{
	  path: 'blogs',
	  loadChildren: () =>
		import('./blogs/blogs.module').then(
		  (m) => m.BlogsModule
		),
	},
  ];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }

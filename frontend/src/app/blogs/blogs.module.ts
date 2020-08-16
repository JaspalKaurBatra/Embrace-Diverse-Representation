import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { GridModule } from 'carbon-components-angular';
import { HttpClientModule } from '@angular/common/http';

import {
	BreadcrumbModule,
	ButtonModule,
	TabsModule, InputModule, TilesModule
  } from 'carbon-components-angular';

@NgModule({
	declarations: [BlogPageComponent, AddBlogComponent],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		BlogsRoutingModule,
		GridModule,
		TilesModule,
		BreadcrumbModule, ButtonModule, TabsModule, InputModule
	]
})
export class BlogsModule { }

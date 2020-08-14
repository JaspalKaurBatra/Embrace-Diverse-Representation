import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-blog-page',
	templateUrl: './blog-page.component.html',
	styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

	title: string;
	content: string;
	constructor() {
		this.title = "";
		this.content = "";
	 }

	ngOnInit(): void {
	}

	postBlog(){
		console.log(this.title + "   "+this.postBlog);
	}
}

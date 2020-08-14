import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-blog-page',
	templateUrl: './blog-page.component.html',
	styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

	title: string;
	content: string;
	invalid : boolean;
	invalidText : string;
	blogs: any;
	response =  [["offensive", 1.0 , 0.17597082609010256],
		["disrespectful", 1.0 , -0.7451112936268498],
		["fearful", 0.0 , -0.7638232613206561],
		["abusive", 0.0 , -0.8593872618629876],
		["hateful", 0.0 , -1.0045886474322825]];
	constructor(private httpService: HttpClient) {
		this.title = "";
		this.content = "";
		this.invalid = false;
		this.invalidText = "";
	 }

	ngOnInit(): void {

		this.httpService.get('./assets/json/blogs.json').subscribe(
			data => {
			  this.blogs = data;	 // FILL THE ARRAY WITH DATA.
			    console.log(this.blogs[0]);
			},
			(err: HttpErrorResponse) => {
			  console.log (err.message);
			}
		  );
	}

	postBlog(){
		let response = this.checkBlogContent(this.content);
		let invalidMsg = [];
		for(let i=0; i<response.length; i++){
			let data = response[i];
			if(data[1] >= 1.0 ){
				invalidMsg.push(data[0]);
			}
		}

		if(invalidMsg.length > 0){
			this.invalid = true;
			this.invalidText = "This content is "
			for(let i=0; i<invalidMsg.length; i++){
				if(i>0){
					this.invalidText = this.invalidText + ", ";
				}
				this.invalidText = this.invalidText + invalidMsg[i];
			}
			//this.invalidText = this.invalidText + "<p><a href='https://www.apa.org/topics/discrimination'>Click here</a> to read more about discrimination!</p>";
		} else{
			this.invalid = false;
			this.saveBlog(this.title, this.content);
		}
	}

	checkBlogContent(content){
		return this.response;
	}

	saveBlog(title, content){
		let newBlog = {id: Math.random() , "title": title, "content": content};
		this.blogs.push(newBlog);
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let body = JSON.stringify(this.blogs);
    	let options = { headers: headers };
    	this.httpService
			.post('./assets/json/blogs.json', body).subscribe(	data =>{
				console.log(data);
			})
	}
}

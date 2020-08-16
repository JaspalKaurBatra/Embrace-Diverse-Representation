import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

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
	loading : boolean;
	PREDICT_OFFENSIVE_URL: string = "";
	PREDICT_ABUSIVE_URL: string = "";
	PREDICT_DISRESPECTFUL_URL: string = "";
	PREDICT_FEARFUL_URL: string = "";
	PREDICT_HATEFUL_URL: string = "";
	SAVE_BLOG_URL = "";
	response =  [];
	constructor(private httpService: HttpClient) {
		this.title = "";
		this.content = "";
		this.invalid = false;
		this.invalidText = "";
		this.loading = false;
		this.PREDICT_OFFENSIVE_URL="https://callforcode-nice-rabbit.mybluemix.net/api/predict_offensive";
		this.PREDICT_ABUSIVE_URL="https://callforcode-nice-rabbit.mybluemix.net/api/predict_abusive";
		this.PREDICT_DISRESPECTFUL_URL="https://callforcode-nice-rabbit.mybluemix.net/api/predict_disrespectful";
		this.PREDICT_FEARFUL_URL="https://callforcode-nice-rabbit.mybluemix.net/api/predict_fearful";
		this.PREDICT_HATEFUL_URL="https://callforcode-nice-rabbit.mybluemix.net/api/predict_hateful";
		this.SAVE_BLOG_URL = "http://localhost:8082/mitigate-algorithmic-bias/blog";
	 }

	ngOnInit(): void {

		this.httpService.get(this.SAVE_BLOG_URL).subscribe(
			data => {
			  this.blogs = data;	 // FILL THE ARRAY WITH DATA.
			},
			(err: HttpErrorResponse) => {
			  console.log (err.message);
			}
		  );
	}

	async postBlog(){
		this.invalid = false;
		this.invalidText = "";
		await this.checkBlogContent(this.content);
		let invalidMsg = [];
		let response = this.response;
		console.log(response);
		for(let i=0; i<response.length; i++){
			let data= response[i];
			if(data.offensive != undefined && data.offensive.prediction>=1.0 && data.offensive.accuracy>=0.35){
				invalidMsg.push("offensive");
			} else if(data.abusive != undefined && data.abusive.prediction>=1.0 && data.abusive.accuracy>=0.35){
				invalidMsg.push("abusive");
			} else if(data.disrespectful != undefined && data.disrespectful.prediction>=1.0 && data.disrespectful.accuracy>=0.35){
				invalidMsg.push("disrespectful");
			} else if(data.fearful != undefined && data.fearful.prediction>=1.0 && data.fearful.accuracy>=0.35){
				invalidMsg.push("fearful");
			} else if(data.hateful != undefined && data.hateful.prediction>=1.0 && data.hateful.accuracy>=0.35){
				invalidMsg.push("hateful");
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
			this.loading = false;
		} else{
			this.invalid = false;
			this.saveBlog(this.title, this.content);
			this.loading = false;
		}	
	}

	checkBlogContent(content){
		let body = [];
		this.response = [];
		body.push(content);
		this.loading = true;
		return new Promise((resolve, reject) => {
			console.log("Calling offensive");
			this.httpService.post(this.PREDICT_OFFENSIVE_URL, body).subscribe(data =>{
				this.response.push(data[0]);
				console.log("Calling abusive");
				this.httpService.post(this.PREDICT_ABUSIVE_URL, body).subscribe(data => {
					this.response.push(data[0]);
					console.log("Calling disrespectful");
					this.httpService.post(this.PREDICT_DISRESPECTFUL_URL, body).subscribe(data => {
						this.response.push(data[0]);
						console.log("Calling fearful");
						this.httpService.post(this.PREDICT_FEARFUL_URL, body).subscribe(data => {
							this.response.push(data[0]);
							console.log("Calling hateful");
							this.httpService.post(this.PREDICT_HATEFUL_URL, body).subscribe(data => {
								this.response.push(data[0]);
								this.loading = false;
								resolve();
							})
						}, error=> {
							this.loading = false;
							console.log(error);
							reject();
						});
					}, error=> {
						this.loading = false;
						console.log(error);
						reject();
					});

				}, error=> {
					this.loading = false;
					console.log(error);
					reject();
				});
			}, error=> {
				this.loading = false;
				console.log(error);
				reject();
			})
		});
	}

	saveBlog(title, content){
		let newBlog = { "user": "David Brown", "title": title, "content": content };
		let body = JSON.stringify(newBlog);
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.httpService.post(this.SAVE_BLOG_URL, body, {headers, responseType: 'text'}).subscribe(data => {
			console.log(data);
		}, error => {
			console.log(error);
		});
	}
}

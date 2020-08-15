import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { ConnectionSignalComponent } from '@carbon/icons-angular';

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

	async postBlog(){
		this.invalid = false;
		this.invalidText = "";
		//await this.checkBlogContent(this.content);
		await this.checkBlogContent2(this.content);
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
		let offensive = this.httpService.post(this.PREDICT_OFFENSIVE_URL, body);
		let abusive = this.httpService.post(this.PREDICT_ABUSIVE_URL, body);
		let disrespectful = this.httpService.post(this.PREDICT_DISRESPECTFUL_URL, body);
		let fearful = this.httpService.post(this.PREDICT_FEARFUL_URL, body);
		let hateful = this.httpService.post(this.PREDICT_HATEFUL_URL, body);
		return new Promise((resolve, reject) => {
			forkJoin([offensive, abusive, disrespectful, fearful, hateful]).subscribe(results => {
				this.response.push(results[0][0]);
				this.response.push(results[1][0]);
				this.response.push(results[2][0]);
				this.response.push(results[3][0]);
				this.response.push(results[4][0]);
				console.log(this.response);
				this.loading = false;
				resolve();
			},
			error=>{
				console.log(error);
				this.loading = false;
				reject();
			});
		});
		// this.httpService.post(this.PREDICT_FEARFUL_URL, body)
		// 	.subscribe(data => {
		// 		console.log(data);
		// 		this.response.push(data[0]);
		// });
		// this.httpService.post(this.PREDICT_HATEFUL_URL, body)
		// 	.subscribe(data => {
		// 		console.log(data);
		// 		this.response.push(data[0]);
		// });
	}

	checkBlogContent2(content){
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
		let newBlog = {id: Math.random() , "title": title, "content": content};
		this.blogs.push(newBlog);
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let body = JSON.stringify(this.blogs);
    	let options = { headers: headers };
    	// this.httpService
		// 	.post('./assets/json/blogs.json', body).subscribe(	data =>{
		// 		console.log(data);
		// 	})
	}
}

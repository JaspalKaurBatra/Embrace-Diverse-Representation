import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';


// carbon-components-angular default imports
import { UIShellModule } from 'carbon-components-angular';

//import { Notification20Module } from '@carbon/icons-angular';
//import { UserAvatar20Module } from '@carbon/icons-angular';
//import { AppSwitcher20Module } from '@carbon/icons-angular';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
	  UIShellModule//,
	//Notification20Module, 
  //UserAvatar20Module, 
  //AppSwitcher20Module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
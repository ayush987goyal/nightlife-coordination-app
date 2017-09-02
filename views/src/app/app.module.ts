import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './core/home/home.component';
import { MongoService } from './mongo.service';
import { BarComponent } from './core/bar/bar.component';
import { MdSlideToggleModule } from '@angular/material';
import { ThripletsPipe } from './thriplets.pipe';
import { RatingModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BarComponent,
    ThripletsPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    HttpModule,
    FormsModule,
    MdSlideToggleModule,
    RatingModule
  ],
  providers: [MongoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

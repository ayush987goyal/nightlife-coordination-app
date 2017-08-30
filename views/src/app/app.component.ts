import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isValid: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCPSY8OJTHgSAr1uXx3yBWhkcUnXuxP8mU",
      authDomain: "voting-app-177314.firebaseapp.com"
    });

    this.subscription = this.authService.validityUpdated.subscribe(
      (obj: any) => {
        this.isValid = obj.isValid;
      }
    );
    this.isValid = this.authService.isAuthenticated();
  }

  onSignOut() {
    this.authService.onSignOut();
  }
}

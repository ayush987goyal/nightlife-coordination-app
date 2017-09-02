import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MongoService } from '../../mongo.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  listOfBars = [];
  goingCountList = [];
  isLoading: boolean = false;

  isValid: boolean;
  userEmail: string;
  copyEmail: any;
  subscription: Subscription;

  @ViewChild('f') form: NgForm;

  constructor(private mongoService: MongoService, private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.validityUpdated.subscribe(
      (obj: any) => {
        this.isValid = obj.isValid;
        this.userEmail = obj.userEmail;

        if (this.copyEmail.email && this.form.value.term) {
          let obj = {
            user: this.copyEmail.email,
            location: this.form.value.term
          }
          console.log(obj);
          this.mongoService.updateUsersLocation(obj).subscribe(
            (res) => {
              console.log(res);
            }
          );
        }
      }
    );
    this.isValid = this.authService.isAuthenticated();
    this.userEmail = this.authService.userEmail;
    this.copyEmail = Object.assign({}, { email: this.userEmail });

    this.mongoService.getGoingCount().subscribe(
      (res) => {
        // console.log(res);
        this.goingCountList = res;
      }
    );
  }

  ngAfterViewInit() {
    this.mongoService.getUsersLocation(this.userEmail).subscribe(
      (res) => {
        if (res.length > 0) {
          this.isLoading = true;
          this.mongoService.getBars(res[0].location).subscribe(
            (data) => {
              this.listOfBars = data;
              this.isLoading = false;
            }
          );
        }
      }
    )
  }

  onSubmit(f) {
    this.isLoading = true;
    this.listOfBars = [];
    this.mongoService.getBars(this.form.value.term).subscribe(
      (data) => {
        this.listOfBars = data;
        this.isLoading = false;
      }
    );
    this.mongoService.getGoingCount().subscribe(
      (res) => {
        // console.log(res);
        this.goingCountList = res;
      }
    );
  }

  getTheGoingCount(id) {
    let pos = this.goingCountList.map((e) => { return e.barId; }).indexOf(id);

    if (pos >= 0) {
      return {
        goingCount: this.goingCountList[pos]['goingCount'],
        goingUsers: this.goingCountList[pos]['goingUsers']
      };
    }
    else {
      return {
        goingCount: 0,
        goingUsers: []
      };
    }
  }

  onSignOut() {
    this.authService.onSignOut();
  }

  ngOnDestroy() {
    if (this.copyEmail.email && this.form.value.term) {
      let obj = {
        user: this.copyEmail.email,
        location: this.form.value.term
      }
      console.log(obj);
      this.mongoService.updateUsersLocation(obj).subscribe(
        (res) => {
          console.log(res);
        }
      );
    }
  }

}

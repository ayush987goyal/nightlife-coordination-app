import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChanges, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { MongoService } from '../../mongo.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnChanges {

  @Input() bar: any;
  @Input() goingData: any;

  goingCount: number;
  goingUsers: string[] = [];
  isGoing: boolean = false;
  isDisabled: boolean = false;

  isValid: boolean;
  userEmail: string;
  subscription: Subscription;

  constructor(private authService: AuthService, private mongoService: MongoService) { }

  ngOnInit() {
    this.subscription = this.authService.validityUpdated.subscribe(
      (obj: any) => {
        this.isValid = obj.isValid;
        this.userEmail = obj.userEmail;
      }
    );
    this.isValid = this.authService.isAuthenticated();
    this.userEmail = this.authService.userEmail;
    this.goingCount = this.goingData.goingCount;
    this.goingUsers = this.goingData.goingUsers;
    this.isGoing = (this.goingUsers.indexOf(this.userEmail) >= 0);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onGoing(e) {
    if (e.checked == true) {
      this.isGoing = true;
      this.goingCount++;
      this.updateTheCount(true);
    } else {
      this.isGoing = false;
      this.goingCount--;
      this.updateTheCount(false);
    }
  }

  updateTheCount(isAddition) {
    this.isDisabled = true;
    if (isAddition) {
      this.goingUsers.push(this.userEmail);
    }
    else {
      let index = this.goingUsers.indexOf(this.userEmail);
      this.goingUsers.splice(index, 1);
    }
    let obj = {
      barId: this.bar.id,
      goingCount: this.goingCount,
      goingUsers: this.goingUsers
    };

    this.mongoService.updateGoingCount(obj).subscribe(
      (res) => {
        // console.log(res);
        this.isDisabled = false;
      }
    );
  }

  distanceRound(dis) {
    return Math.round(dis);
  }



}

import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnChanges {

  @Input() bar: any;

  goingCount: number = 0;
  isGoing: boolean = false;

  isValid: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.validityUpdated.subscribe(
      (obj: any) => {
        this.isValid = obj.isValid;
      }
    );
    this.isValid = this.authService.isAuthenticated();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onGoing(e) {
    if (e.checked == true) {
      this.isGoing = true;
      this.goingCount++;
    } else {
      this.isGoing = false;
      this.goingCount--;
    }
  }

  distanceRound(dis) {
    return Math.round(dis);
  }

  

}

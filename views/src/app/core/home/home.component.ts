import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MongoService } from '../../mongo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listOfBars = [];
  isLoading: boolean = false;

  @ViewChild('f') form : NgForm;

  constructor(private mongoService: MongoService) { }

  ngOnInit() {
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
  }

}

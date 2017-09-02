import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

@Injectable()
export class MongoService {

  constructor(private http: Http) { }

  // local = 'http://localhost:3000';
  local = '';

  getGoingCount() {
    return this.http.get(this.local + '/goingCount').map(
      (res) => { return res.json(); }
    );
  }

  getBars(location: string) {
    return this.http.get(this.local + '/bars/' + location).map(
      (res) => { return res.json(); }
    );
  }

  getUsersLocation(user: string) {
    return this.http.get(this.local + '/usersLocation/' + user).map(
      (res) => { return res.json(); }
    )
  }

  updateUsersLocation(userInfo: any) {
    return this.http.post(this.local + '/usersLocation', userInfo).map(
      (res) => { return res.json(); }
    )
  }

  updateGoingCount(goingData: any) {
    return this.http.post(this.local + '/updateGoingCount', goingData).map(
      (res) => { return res.json(); }
    )
  }

}

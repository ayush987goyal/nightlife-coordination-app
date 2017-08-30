import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';

@Injectable()
export class MongoService {

  constructor(private http: Http) { }

  getBars(location: string) {
    return this.http.get('/bars/' + location).map(
      (res) => { return res.json(); }
    );
  }

}

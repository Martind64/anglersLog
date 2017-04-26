import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SimpleCatch } from '../../models/SimpleCatch';
// import { Observable } from "rxjs/Observable";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-addcatch',
  templateUrl: 'addcatch.html'
})
export class AddcatchPage {

  public currentCatch:SimpleCatch = new SimpleCatch();
  public catches:Array<SimpleCatch> = new Array<SimpleCatch>();
  public weather = [];
  constructor(public navCtrl: NavController, public http:Http, public geoloaction: Geolocation) {
  	this.getCatches();
    // Doesn't work
    // this.getWeather(); 
  }

  public getCatches(){
    this.http.get("api/catches")
    .subscribe(
      data => this.catches = data.json().catches);
  }
  // Can't get weather api to work
  public getWeather(){
    this.http.get("weather/weather?q=London&APPID=e0bd921d8113274147b36d5e06a20e21")
    .subscribe(
      data => this.weather = data.json().weather)
  }

  public addCatch() 
  {
    this.geoloaction.getCurrentPosition().then((position) => {
      this.currentCatch.latitude = position.coords.latitude;
      this.currentCatch.longitude = position.coords.longitude;
    });
    // this.currentCatch.latitude = 55.6427628;
    // this.currentCatch.longitude = 12.101314;
    this.currentCatch.datetime = "2017-04-03 9:00:00";
    alert(JSON.stringify(this.currentCatch));
    this.http.post("api/catches", JSON.stringify(this.currentCatch))
    .subscribe(
      (val) => { alert("data succesfully send! " + val.text())},
      (err) => { alert("No data received! " + err ) },
      ()    => { alert("task completed?") }
    )
  }

}

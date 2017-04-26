import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SimpleCatch } from '../../models/SimpleCatch';
// import { Observable } from "rxjs/Observable";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public currentCatch:SimpleCatch = new SimpleCatch();
  public catches:Array<SimpleCatch> = new Array<SimpleCatch>();

  constructor(public navCtrl: NavController, public http:Http, public geoloaction: Geolocation) {
  	this.getCatches();
    this.log();
  }

  public getCatches(){
    this.http.get("api/catches")
    .subscribe(
      data => this.catches = data.json().catches);
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

  public log(){
    for(let c of this.catches){
      console.log(c.angler_name);
    }
  }
}

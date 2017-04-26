import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SimpleCatch } from '../../models/SimpleCatch';
// import { Observable } from "rxjs/Observable";
import { Geolocation } from '@ionic-native/geolocation';
import { AddcatchPage } from '../addcatch/addcatch';
import { ShowcatchesPage } from '../showcatches/showcatches';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public http:Http, public geoloaction: Geolocation) {
  }

  addcatchPage = AddcatchPage;
  showcatchesPage = ShowcatchesPage;
}

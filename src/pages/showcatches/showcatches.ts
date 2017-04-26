import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SimpleCatch } from '../../models/SimpleCatch';
import {Http} from '@angular/http';
import { SinglecatchPage } from '../singlecatch/singlecatch';

/*
  Generated class for the Showcatches page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-showcatches',
  templateUrl: 'showcatches.html'
})
export class ShowcatchesPage {
  public catches:Array<SimpleCatch> = new Array<SimpleCatch>();

  constructor(public navCtrl: NavController, public http:Http) {
  	this.getCatches();
  }

  public getCatches(){
    this.http.get("api/catches")
    .subscribe(
      data => this.catches = data.json().catches);
  }

  selectCatch(aCatch:SimpleCatch)
  {
    this.navCtrl.push(SinglecatchPage, aCatch);
  }

}

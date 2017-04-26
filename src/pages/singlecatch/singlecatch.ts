import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Singlecatch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-singlecatch',
  templateUrl: 'singlecatch.html'
})
export class SinglecatchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

 
  public anglerName = this.navParams.get('angler_name');
  public datetime = this.navParams.get('datetime');
  public fishingMethod = this.navParams.get('fishing_method');
  public breed = this.navParams.get('breed');
  public length = this.navParams.get('length');
  public weight = this.navParams.get('weight');
  public weather = this.navParams.get('weather');
  public location = this.navParams.get('location');


}

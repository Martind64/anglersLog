import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Http} from '@angular/http';
import { SimpleCatch } from '../../models/SimpleCatch';

declare var google;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public catches:Array<SimpleCatch> = new Array<SimpleCatch>();

  constructor(public navCtrl: NavController, public geoloaction:Geolocation, public http:Http) {
  }

 @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  ionViewDidLoad(){
  	this.getCatches();
    this.loadMap();
  }
 
	 
	loadMap(){
	    this.geoloaction.getCurrentPosition().then((position) => {
	 
	      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	 
	      let mapOptions = {
	        center: latLng,
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	      }
	 
	      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	 
	    }, (err) => {
	      console.log(err);
	    });
	 
	  }


		addInfoWindow(marker, content){
 
		  let infoWindow = new google.maps.InfoWindow({
		    content: content
		  });
		 
		  google.maps.event.addListener(marker, 'click', () => {
		    infoWindow.open(this.map, marker);
		  });
		 
		}

		addCatchesToMap(){
			for(var theCatch of this.catches){
			let marker = new google.maps.Marker({
				map: this.map,
				position: {lat: theCatch.latitude, lng: theCatch.longitude}

			});
				let content = "Caught by:" + theCatch.angler_name + "<br>Breed: "+theCatch.breed;
				this.addInfoWindow(marker, content);
			}
		}

		  public getCatches(){
		    this.http.get("api/catches")
		    .subscribe(
		      data => this.catches = data.json().catches);
		  }
 
}

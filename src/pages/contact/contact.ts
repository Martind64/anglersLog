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

  	  addMarker(){
  	  	 this.geoloaction.getCurrentPosition().then((position) => {
			  let marker = new google.maps.Marker({
			    map: this.map,
			    animation: google.maps.Animation.DROP,
			    position: {lat: position.coords.latitude, lng: position.coords.longitude}
			  });		 
			  let content = "<h4>Information!</h4>";          
			 
			  this.addInfoWindow(marker, content);
  	  	 });
 
		}

		// Can't get the markers on the map on load, had to use a button to load them after the map has loaded
		// For some reason it doesn't work on a device
		// Can't add markers when looping but can add them with coordinates one at a time using addMarker method 
		addCatchesToMap(){
			for(var theCatch of this.catches){
				let marker = new google.maps.Marker({
					map: this.map,
					position: {lat: theCatch.latitude, lng: theCatch.longitude}
			});
				let content = "Caught by:" + theCatch.angler_name + "<br>Breed: "+ theCatch.breed + "<br>Weight: " + theCatch.weight
				+ "<br>Date & Time: " + theCatch.datetime + "<br>Fishing Method: " + theCatch.fishing_method;
				this.addInfoWindow(marker, content);
			}
		}

		  public getCatches(){
		    this.http.get("api/catches")
		    .subscribe(
		      data => this.catches = data.json().catches);
		  }
 
}

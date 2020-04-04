import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() coords: number[];
  @ViewChild('map', {static : true}) divMap: ElementRef;

  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    this.onLoadMap();
  }


  async onLoadMap() {

    const latLon = new google.maps.LatLng( this.coords[0], this.coords[1] );

    const mapOpt: google.maps.MapOptions = {
      center: latLon,
      zoom: 15.3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map( this.divMap.nativeElement, mapOpt);

    const marker = new google.maps.Marker({
      position: latLon,
      title: 'Mi ubicación',
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    });

  }

}

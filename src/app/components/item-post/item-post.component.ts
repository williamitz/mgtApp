import { Component, OnInit, Input } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-item-post',
  templateUrl: './item-post.component.html',
  styleUrls: ['./item-post.component.scss'],
})
export class ItemPostComponent implements OnInit {
  @Input() post: IPost = {};
  perro1 = './assets/perro-1.jpg';
  perro2 = './assets/perro-2.jpg';
  perro3 = './assets/perro-3.jpg';

  haveCoords = false;


  constructor() { }

  ngOnInit() {
    this.haveCoords = this.post.coords.coordinates[0] !== 0 ? true : false;
  }

}

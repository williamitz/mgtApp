import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
})
export class ListPostComponent implements OnInit, OnDestroy {

  @Input() dataPost: IPost[] = [];

  constructor() { }

  ngOnInit() {
    console.log('init list post');
    // console.log(this.dataPost);
  }

  ngOnDestroy() {
    console.log('destroy list post');
  }

}

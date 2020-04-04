import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { IonSlides } from '@ionic/angular';
import { IAvatar } from '../../interfaces/avatar.interface';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @ViewChild('slideAvatar', {static: true}) slideAvatar: IonSlides;
  // tslint:disable-next-line: no-output-rename
  @Output() getAvatar: EventEmitter<IAvatar> = new EventEmitter();

  avatars: IAvatar[] = [
    {
      img: 'av-1.png',
      sex: 'M',
      selected: true
    }, {
      img: 'av-2.png',
      sex: 'M',
      selected: false
    }, {
      img: 'av-3.png',
      sex: 'F',
      selected: false
    }, {
      img: 'av-4.png',
      sex: 'M',
      selected: false
    }, {
      img: 'av-5.png',
      sex: 'F',
      selected: false
    }, {
      img: 'av-6.png',
      sex: 'M',
      selected: false
    }, {
      img: 'av-7.png',
      sex: 'F',
      selected: false
    }, {
      img: 'av-8.png',
      sex: 'M',
      selected: false
    }
  ];

  indexSlide = 0;

  slideAvOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    effect: 'slide',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  };
  constructor() { }

  ngOnInit() {
    // this.avatarEmiter  = new EventEmitter();
  }

  onNextAvatar() {
    // console.log('click next');
    this.indexSlide += 1;
    this.slideAvatar.slideNext();
  }

  onPrevAvatar() {
    this.indexSlide -= 1;
    this.slideAvatar.slidePrev();
  }

  onSelectedAvatar(index: number) {
    // console.log(index);
    this.avatars.forEach( avatar =>  {
      avatar.selected = false;
    });
    
    const avatarSlt = this.avatars[index];
    avatarSlt.selected = true;
    this.getAvatar.emit(  avatarSlt  );
  }

}

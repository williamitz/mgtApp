import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() titleComponent: string;

  constructor() { }

  ngOnInit() {
    console.log('titulo', this.titleComponent);
  }

}

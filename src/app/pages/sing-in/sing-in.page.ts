import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html',
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {
  
  bodyUser: UserModel;

  constructor() { }

  ngOnInit() {

    this.bodyUser = new UserModel();

  }

  onSingin() {
    console.log('singin');
  }

}

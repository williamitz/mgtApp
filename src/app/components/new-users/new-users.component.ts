import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComunityService } from '../../services/comunity.service';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss'],
})
export class NewUsersComponent implements OnInit {
  @Output() showModalInfo = new EventEmitter();

  users = [];

  slidesOptions = {
    spaceBetween: 1.5,
    slidesPerView: 3.5,
  };

  constructor(private comunitySvc: ComunityService) { }

  ngOnInit() {
    this.onLoadNewUsers();
  }

  onLoadNewUsers() {
    this.comunitySvc.onGetNewUsers().subscribe( res => {
      if (!res.ok) {
        throw new Error( res.error );
      }
      console.log(res);
      this.users = res.data;
    });
  }

  onShowModalInfo( user: any ) {
    this.showModalInfo.emit( user );
  }

}

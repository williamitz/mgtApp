import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IFollower } from 'src/app/interfaces/follower.interface';
import { ProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs';
import { IResponseProfileInfo } from '../../interfaces/profileInfo.interface';
import { ComunityService } from '../../services/comunity.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit, OnDestroy {
  @Input() user: IFollower;

  dataInfo: IResponseProfileInfo = {
    ok: true,
    user: {
      nameUser: '',
      nameComplete: ''
    },
    comunity: {
      _id: '',
      followed: [],
      followers: []
    }
  };
  infoSbs: Subscription;

  constructor( private modalCtrl: ModalController, private profileSvc: ProfileService, private comunitySvc: ComunityService ) { }

  ngOnInit() {

    this.infoSbs = this.profileSvc.onGetProfileInfo( this.user._id ).subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }

      this.dataInfo = res;
    });

  }

  async onCloseModalInfo() {
    await this.modalCtrl.dismiss({
      data: { ok: true }
    });
  }

  ngOnDestroy() {
    this.infoSbs.unsubscribe();
  }

  onAddFollowed() {
    this.comunitySvc.onAddFollowed( this.dataInfo.user._id ).subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }

      this.dataInfo.followed = true;

      console.log('Siguiendo persona');
    });
  }

  onRemoveFollowed() {
    this.comunitySvc.onRemoveFollowed( this.dataInfo.user._id ).subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }

      this.dataInfo.followed = false;

      console.log('Dejar de segguir persona');
    });
  }

}

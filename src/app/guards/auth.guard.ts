import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor( private storageSvc: StorageService, private navCtrl: NavController  ) {}

  async canLoad() {

    const valid = await  this.storageSvc.onAuthToken();
    if (!valid) {
      this.navCtrl.navigateRoot('/login', {animated: true});
      return false;
    }

    return true;

  }

}

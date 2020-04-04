import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanLoad {

  constructor(private navCtrl: NavController, private storageSvc: StorageService) {}
  async canLoad() {
    await this.storageSvc.onLodadToken();
    // console.log('token', this.storageSvc.token);
    if (this.storageSvc.token === 'xD' || this.storageSvc.token === '' || !this.storageSvc.token) {
      this.navCtrl.navigateRoot('/login', { animated: true });
      // console.log('volviendo a login');
      return false;
    }
    return true;
  }
  
}

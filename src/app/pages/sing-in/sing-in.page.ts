import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AlertController, NavController } from '@ionic/angular';
import { IAvatar } from '../../interfaces/avatar.interface';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html', 
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {

  bodyUser: UserModel;
  loading = false;

  constructor(private userSvc: UserService, private storage: StorageService, private alertCtrl: AlertController, private router: NavController) { }

  ngOnInit() {
    this.bodyUser = new UserModel();
  }

  onGetAvatar( $event: IAvatar ) {
    this.bodyUser.imgUser = $event.img;
    this.bodyUser.sex = $event.sex;
  }

  onSingin( frm: NgForm ) {

    if (frm.valid) {

      this.loading = true;
      this.userSvc.onSingin( this.bodyUser ).subscribe( async (res) => {
        if (!res.ok) {
          throw new Error( res.error );
        }

        this.loading = false;
        if (res.showError === 0) {

          await this.storage.onSaveCredentials( res.token, res.data );
          this.router.navigateRoot( '/home', { animated: true } );

        } else {
          this.onShowAlert( this.onGetError( res.showError ) );
        }
      });

    }
  }

  async onShowAlert( message ) {

    const alertModal = this.alertCtrl.create({
      header: 'Mensaje al usuario',
      mode: 'ios',
      translucent: true,
      message,
      buttons:[ {
        text: 'Ok',
        role: 'ok',
        cssClass: 'secondary',
        handler: () => {
          this.router.navigateRoot( '/home', { animated: true } );
        }
      } ]

    });

    (await alertModal).present();

  }

  onGetError( showError: number ): string {
      const arrMsg: string[] = showError === 0 ? ['Se creo un usuario con éxito'] : ['Ya existe un registro'];
      // tslint:disable-next-line: no-bitwise
      if (showError & 1) {
        arrMsg.push('con este usuario');
      }

      // tslint:disable-next-line: no-bitwise
      if (showError & 2) {
        arrMsg.push('está inactivo');
      }

      // tslint:disable-next-line: no-bitwise
      if (showError & 4) {
        arrMsg.push('sexo especificado inválido');
      }

      return  arrMsg.join(', ') ;
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { WebsocketService } from '../../services/websocket.service';
import { UserService } from '../../services/user.service';
import { AlertController, NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  bodyLogin: LoginModel;
  loading = false;

  // tslint:disable-next-line: max-line-length
  constructor( private wsSevice: WebsocketService, private userSvc: UserService, private alertCtrl: AlertController, private navCtrl: NavController, private storageSvc: StorageService) { }

  ngOnInit() {
    
    this.bodyLogin = new LoginModel();

  }

  onLogin(frm: any) {

    if (frm.valid) {
      this.loading = true;

      this.userSvc.onLogin( this.bodyLogin ).subscribe( async (res: any) => {
        if (!res.ok) {
          throw Error( res.error );
        }

        if (res.showError !== 0) {
          this.onShowAlert( await this.onGetError( res.showError ) );

          await this.storageSvc.onClearStorage();

        } else {

          await this.storageSvc.onSaveCredentials( res.token, res.data );
          this.navCtrl.navigateRoot('/home', { animated: true });

        }

        this.loading = false;

      });

    }

  }

  async onShowAlert( message: string ) {
    const alert = this.alertCtrl.create({
      header: 'Mensaje al usuario',
      message,
      translucent: true,
      mode: 'ios',
      buttons: [{
        text: 'Aceptar',
        role: 'ok'
      }]
    });

    (await alert).present();
  }

  onGetError(showError: number): Promise<string> {
    return new Promise( (resolve) => {
      let msg = '';

      // tslint:disable-next-line: no-bitwise
      if (showError === 1) {
        msg = '(Usuario) o contraseña inválida';
      }

      if (showError === 2) {
        msg = 'Usuario inactivo';
      }

      if (showError === 4) {
        msg = 'Usuario o (contraseña) inválida';
      }


      resolve(msg);

    });
  }

}

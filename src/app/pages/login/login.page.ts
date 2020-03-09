import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { WebsocketService } from '../../services/websocket.service';
import { UserService } from '../../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  bodyLogin: LoginModel;
  loading = false;

  constructor(private router: Router, private wsSevice: WebsocketService, private userSvc: UserService, private alertCtrl: AlertController) { }

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
          // this.loading = false;
          // return;
        } else {

          localStorage.setItem('dataUser', JSON.stringify( res.data ));
          localStorage.setItem('token', res.token);
          // this.wsSevice.onSingInSocket( this.bodyLogin );
          this.router.navigate(['/home']);

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

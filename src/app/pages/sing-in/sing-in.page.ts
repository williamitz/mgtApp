import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.page.html', 
  styleUrls: ['./sing-in.page.scss'],
})
export class SingInPage implements OnInit {
  
  bodyUser: UserModel;
  loading = false;

  constructor(private userSvc: UserService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {

    this.bodyUser = new UserModel();

  }

  onSingin( frm: any ) {
    console.log('singin');

    if (frm.valid) {

      this.loading = true;
      this.userSvc.onSingin( this.bodyUser ).subscribe( async (res: any) => {
        if (!res.ok) {
          throw new Error( res.error );
        }

        this.onShowAlert( await this.onGetError( res.showError ) );
        this.loading = false;
      });
      console.log(this.bodyUser);
      
    }
  }

  async onShowAlert( message ) {

    const alertModal = this.alertCtrl.create({
      header: 'Mensaje al usuario',
      mode: 'ios',
      translucent: true,
      message,
      buttons:[{
        text: 'Ok',
        role: 'ok',
        cssClass: 'secondary',
        handler: () => {
          this.router.navigate(['home']);
        }
      }]

    });

    (await alertModal).present();

  }

  onGetError( showError: number ): Promise<string> {
    return new Promise( (resolve) => {

      const arrMsg: string[] = showError === 0 ? ['Se creo un usuario con éxito'] : ['Ya existe un registro'];
      // tslint:disable-next-line: no-bitwise
      if (showError & 1) {
        arrMsg.push('con este usuario');
      }

      // tslint:disable-next-line: no-bitwise
      if (showError & 2) {
        arrMsg.push('está inactivo');
      }

      resolve( arrMsg.join(', ') );

    });
  }

}

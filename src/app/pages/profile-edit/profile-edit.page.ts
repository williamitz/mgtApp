import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileModel } from 'src/app/models/profile.model';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  dayNames = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  bodyProfile: ProfileModel;

  constructor(private profileSvc: ProfileService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.bodyProfile = new ProfileModel();

    this.profileSvc.onGetProfile().subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }

      this.bodyProfile.name = res.data.name;
      this.bodyProfile.surname = res.data.surname;
      this.bodyProfile.name = res.data.name;
      this.bodyProfile.email = res.data.email;
      this.bodyProfile.phone = res.data.phone;
      this.bodyProfile.sex = res.data.sex;
      this.bodyProfile.aboutMe = res.data.aboutMe || '';
      this.bodyProfile.dateBorn = res.data.dateBorn || '2002-09-23T15:03:46.789';

      // console.log(res);
    });
  }

  async onUpdateProfile( frm: NgForm ) {

    if (frm.valid) {
      await this.onShowLoading();
      this.profileSvc.onUpdateProfile( this.bodyProfile ).subscribe( async (res) => {

        if (!res.ok) {
          throw new Error( res.error );
        }

        this.loadingCtrl.dismiss();
  
        this.router.navigateByUrl('/profile');

      });
    }

  }

  async onShowLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Guardando',
      translucent: true,
      spinner: 'bubbles'
    });

    return loading.present();
  }

}

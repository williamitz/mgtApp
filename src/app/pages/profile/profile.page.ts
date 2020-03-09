import { Component, OnInit } from '@angular/core';
import { IProfile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  dataProfile: IProfile = {
    name: '',
    surname: '',
    nameComplete: '',
    email: '',
    phone: '',
    aboutMe: '',
    sex: '',
    dateBorn: ''
  };

  constructor( private profileSvc: ProfileService ) { }

  ngOnInit() {
    
    this.profileSvc.onGetProfile().subscribe( (res: any) => {
      if (!res.ok) {
        throw new Error( res.error );
      }

      this.dataProfile.name = res.data.name;
      this.dataProfile.surname = res.data.surname;
      this.dataProfile.nameComplete = res.data.nameComplete;
      this.dataProfile.email = res.data.email;
      this.dataProfile.phone = res.data.phone;
      this.dataProfile.aboutMe = res.data.aboutMe;
      this.dataProfile.sex = res.data.sex;
      this.dataProfile.dateBorn = res.data.dateBorn;

    });

  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProfileModel } from '../models/profile.model';
import { IResponse } from '../interfaces/response.interface';
import { StorageService } from './storage.service';
import { IResponseProfileInfo } from '../interfaces/profileInfo.interface';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private storageSvc: StorageService) { }

  onGetProfile() {
    return this.http.get<IResponse>( URI_API + `/profile/get`, { headers: { Authorization:  this.storageSvc.token } } );
  }

  onUpdateProfile( body: ProfileModel ) {
    return this.http.post<IResponse>( URI_API + `/profile/update`, body, { headers: { Authorization:  this.storageSvc.token } } );
  }

  onGetProfileInfo( idUser: string ) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<IResponseProfileInfo>( URI_API + `/profileInfo/${ idUser }`, { headers: { Authorization:  this.storageSvc.token } } );
  }

}

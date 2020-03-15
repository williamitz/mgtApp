import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProfileModel } from '../models/profile.model';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  onGetProfile() {
    return this.http.get( URI_API + `/profile/get`, { headers: { Authorization: localStorage.getItem('token') } } );
  }

  onUpdateProfile( body: ProfileModel ) {
    return this.http.post( URI_API + `/profile/update`, body, { headers: { Authorization: localStorage.getItem('token') } } );
  }

}

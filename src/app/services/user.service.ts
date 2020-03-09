import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginModel } from '../models/login.model';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
}) 
export class UserService {

  constructor( private http: HttpClient ) { }

  onSingin( body: UserModel ) {

    return this.http.post( URI_API + '/singIn', body );

  }

  onLogin( body: LoginModel ) {
    return this.http.post( URI_API + `/login`, body );
  }
}

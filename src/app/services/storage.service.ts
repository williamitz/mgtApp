import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IResponse } from '../interfaces/response.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public token = '';
  userData: any = { imgUser: null };

  constructor(private storage: Storage, private http: HttpClient, private router: NavController) { }

  async onSaveCredentials( token: string, userData: any ) {
    this.token = token;
    this.userData = userData;
    await this.storage.set('token', token);
    await this.storage.set('userData', JSON.stringify( userData ));

    await this.onAuthToken();
    return true;
  }

  async onLodadToken() {
    this.token = await this.storage.get('token') || '';
  }

  async onLoadDataUser() {
    this.userData = JSON.parse( await this.storage.get('userData') ) || { imgUser: null };
  }

   onClearStorage() {
    this.token = null;
    this.userData = null;
    this.storage.clear();
    this.router.navigateRoot('/login', { animated: true });
    return true;
  }

  async onAuthToken(): Promise<boolean> {
    await this.onLodadToken();
    if (this.token === '') {
      return Promise.resolve(false);
    }

    return new Promise( ( resolve ) => {
      this.http.post<IResponse>(URI_API + `/authentication`, {}, {headers: { Authorization: this.token } }).subscribe( (res) => {

        if (res.ok) {
          return resolve(true);
        }

        this.onClearStorage();

        resolve(false);
      });
    });
  }

}

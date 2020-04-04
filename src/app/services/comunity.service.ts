import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { IResponse } from '../interfaces/response.interface';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})
export class ComunityService {

  constructor(private http: HttpClient, private storageSvc: StorageService) { }

  onGetNewUsers() {
    return this.http.get<IResponse>( URI_API + `/Comunity/newFollow`, {headers: {Authorization: this.storageSvc.token }} );
  }

  onAddFollowed( idFollowed: string ) {
    const header = { headers: { Authorization: this.storageSvc.token } };
    return this.http.post<IResponse>( URI_API + `/Comunity/AddFollowed`, { idFollowed }, header  );
  }

  onRemoveFollowed( idFollowed: string ) {
    const header = { headers: { Authorization: this.storageSvc.token } };
    return this.http.post<IResponse>( URI_API + `/Comunity/RemoveFollowed`, { idFollowed  }, header  );
  }

}

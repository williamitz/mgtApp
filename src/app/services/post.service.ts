import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/post.model';
import { IResponse } from '../interfaces/response.interface';
import { IResponsePost } from '../interfaces/post.interface';
import { StorageService } from './storage.service';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public page = 0;

  constructor( private http: HttpClient, private storageSvc: StorageService ) { }
  
  onAddPost( body: PostModel ) {
    return this.http.post<IResponse>( URI_API + `/post/add`, body, { headers: { Authorization: this.storageSvc.token } } );
  }

  onGetPost( pull = false ) {
    if (pull) {
      this.page = 0;
    }

    this.page += 1;

    // tslint:disable-next-line: max-line-length
    return this.http.get<IResponsePost>( URI_API + `/post/get?page=${ this.page }`, { headers: { Authorization: this.storageSvc.token } } );
  }


}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models/post.model';

const URI_API = environment.URL_SERVER;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private http: HttpClient ) { }
  
  onAddPost( body: PostModel ) {
    return this.http.post( URI_API + `/post/add`, body, { headers: { Authorization: localStorage.getItem('token') } } );
  }

  onGetPost( page: number ) {
    return this.http.get( URI_API + `/post/get?page=${ page }`, { headers: { Authorization: localStorage.getItem('token') } } );
  }

}

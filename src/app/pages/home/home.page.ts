import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infinitePost: IonInfiniteScroll;

  dataPost: any[] = [];
  page = 1;

  constructor(private router: Router, private modalCtrl: ModalController, private postSvc: PostService) { }

  ngOnInit() {

    this.onGetPost();

  }

  onGetPost() {
    this.postSvc.onGetPost( this.page ).subscribe( (res: any) => {
      if (!res.ok) {
        throw new Error( res.error );
      }

      this.dataPost = res.data;

    });
  }

  onLogOut() {
    localStorage.removeItem('dataUser');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  loadPosts( event: any ) {
    // console.log(event);

    this.page += 1;

    this.postSvc.onGetPost( this.page ).subscribe( (res: any) => {
      if (!res.ok) {
        throw new Error( res.error );
      }
      // const newPosts = res.data;
      console.log(res);
      console.log('10 registros mas', this.page);
      this.dataPost.push( ...res.data );

      if (this.dataPost.length === res.total) {
        event.target.complete();
        this.infinitePost.disabled = true;
        return;
      } else {
        event.target.complete();
        this.infinitePost.disabled = false;
        return;
      }
    });

  }

  onNewPost(  ) {
    this.onGetPost();
  }

}

import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/post.interface';
// import { PostPage } from '../post/post.page';
import { ModalPostComponent } from '../../components/modal-post/modal-post.component';
import { StorageService } from '../../services/storage.service';
import { Subscription } from 'rxjs';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('btnShowModalPost', {static: true}) btnModal: ElementRef;

  dataPost: IPost[] = [];
  // page = 1;

  postSbs: Subscription;
  scrollDisabled = false;

  // tslint:disable-next-line: max-line-length
  constructor( private modalCtrl: ModalController, private postSvc: PostService, private storageSvc: StorageService) { }

  ngOnInit() {
    this.loadPosts();

  }

  async onShowModal() {
    // document.getElementById('btnShowModalPost').click();
    const postModal = await this.modalCtrl.create({
      component: ModalPostComponent,
      animated: true,
      componentProps: {
        key: 'value'
      }
    });

    await postModal.present();
    postModal.onDidDismiss().then( (disModal: any) => {
      if (disModal.data.ok) {
        this.dataPost.unshift( disModal.data.newPost );
      }
    });
  }

  onLogOut() {

    this.postSvc.page = 0;
    this.storageSvc.onClearStorage();
  }

  loadPosts( event?: any, pull = false ) {

    this.postSbs = this.postSvc.onGetPost( pull ).subscribe( (res) => {
      if (!res.ok) {
        throw new Error( res.error );
      }
      this.dataPost.push( ...res.data );

      if (event) {
        event.target.complete();
        if (res.data.length === 0) {
          this.scrollDisabled = true;
        }
      }

    });

  }

  onRefreshPost( event: any ) {
    this.scrollDisabled = false;
    this.dataPost = [];

    this.loadPosts( event, true );
    // this.refresherPost.complete();
  }

  ngOnDestroy() {
    console.log('destruyendo home page');
    this.postSbs.unsubscribe();
  }

  async onShowModalInfo( $event ) {
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        user: $event
      }
    });

    await modal.present();
  }

}

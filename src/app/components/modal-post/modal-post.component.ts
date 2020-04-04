import { Component, OnInit, ViewChild, EventEmitter, ElementRef, Output } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IPost } from 'src/app/interfaces/post.interface';
// import { IResponsePost } from '../../interfaces/post.interface';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { IResponse } from '../../interfaces/response.interface';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

declare var window: any;

@Component({
  selector: 'app-modal-post',
  templateUrl: './modal-post.component.html',
  styleUrls: ['./modal-post.component.scss'],
})
export class ModalPostComponent implements OnInit {

  @Output() createPost = new EventEmitter<IPost>();
  @ViewChild('mapPost', {static: false}) map: ElementRef;

  bodyPost: PostModel;
  loading = false;
  loadingPhoto = false;
  showMap = false;
  loadingCoords = false;
  tmpImg: string[] = [];
  optSlide = {
    effect: 'slide',
    spaceBetween: 8,
    slidesPerView: 3.3,
    freeMode: true
  };

  mapPost: google.maps.Map;

  // tslint:disable-next-line: max-line-length
  constructor(private postSvc: PostService
    // tslint:disable-next-line: align
    , public storageSvc: StorageService
    // tslint:disable-next-line: align
    , private geo: Geolocation
    // tslint:disable-next-line: align
    , private camera: Camera
    // tslint:disable-next-line: align
    , private modalCtrl: ModalController) { }

  async ngOnInit() {

    this.bodyPost = new PostModel();
    await this.storageSvc.onLoadDataUser();
    console.log(this.storageSvc.userData);

  }
  

  onLoadMap() {
    const latLng = new google.maps.LatLng( this.bodyPost.coords.coordinates[0], this.bodyPost.coords.coordinates[1] );

    const mapOpt: google.maps.MapOptions = {
      center: latLng,
      zoom: 15.5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    this.mapPost = new google.maps.Map( this.map.nativeElement, mapOpt );

    const marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: this.mapPost,
      draggable: true
    });

    marker.addListener('dragend', (event) => {
      this.bodyPost.coords.coordinates[0] = event.latLng.lat();
      this.bodyPost.coords.coordinates[1] = event.latLng.lng();
    });

  }

  onSubmitPost( frmPost: NgForm ) {

    if (frmPost.valid) {

      this.loading = true;

      this.postSvc.onAddPost( this.bodyPost ).subscribe( (res) => {
        if (!res.ok) {
          throw new Error( res.error );
        }

        this.bodyPost = new PostModel();
        this.loading = false;

        this.modalCtrl.dismiss( { ok: true, newPost: res.data } );
        this.createPost.emit( res.data );
      });

    }

  }

  onDismis() {
    this.modalCtrl.dismiss( { ok: false } );
  }

  onSaveTmpImg(): Promise<IResponse>{
    return new Promise( (resolve) => {

    });
  }

  onChangeToggle() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      this.loadingCoords = true;
      this.geo.getCurrentPosition().then( (geo) => {
        // console.log(geo.coords);

        this.bodyPost.coords.coordinates = [ geo.coords.latitude, geo.coords.longitude ];
        setTimeout(() => {
          this.onLoadMap();
        }, 120);

        this.loadingCoords = false;
      }).catch( err => {
        console.error('Erro al obtener ubicación del dispositivo', err);
        this.loadingCoords = false;
      });
    }
  }

  onResetForm(frmPost: NgForm) {
    frmPost.reset();
    this.bodyPost = new PostModel();
  }

  onNewPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // allowEdit: true,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.onBuildPhoto( options );
  }

  onOpenFile() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // allowEdit: true,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.onBuildPhoto( options );
  }

  onBuildPhoto(options: CameraOptions) {
    this.loadingPhoto = true;
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc( imageData );
      this.tmpImg.unshift( img );
      // console.log(this.tmpImg);
      this.loadingPhoto = false;
 
     //  let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      throw new Error(err);
     });
  }
}

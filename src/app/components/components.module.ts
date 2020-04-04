import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalPostComponent } from './modal-post/modal-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { PipesModule } from '../pipes/pipes.module';
import { ItemPostComponent } from './item-post/item-post.component';
import { AvatarComponent } from './avatar/avatar.component';
import { FormsModule } from '@angular/forms';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapComponent } from './map/map.component';
import { NewUsersComponent } from './new-users/new-users.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalPostComponent,
    ListPostComponent,
    ItemPostComponent,
    AvatarComponent,
    MapComponent,
    NewUsersComponent
  ],
  exports: [
    HeaderComponent,
    ModalPostComponent,
    ListPostComponent,
    ItemPostComponent,
    AvatarComponent,
    MapComponent,
    NewUsersComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule
  ],
  // providers: [
  //   Geolocation
  // ]
})
export class ComponentsModule { }

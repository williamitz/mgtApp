import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ModalPostComponent } from '../../components/modal-post/modal-post.component';
import { NewUsersComponent } from '../../components/new-users/new-users.component';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';

@NgModule({
  entryComponents: [
    // modals
    ModalPostComponent,
    NewUsersComponent,

    ModalInfoPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    PipesModule,
    ModalInfoPageModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ProfileEditPageRoutingModule } from './profile-edit-routing.module';

import { ProfileEditPage } from './profile-edit.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfileEditPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProfileEditPage]
})
export class ProfileEditPageModule {}

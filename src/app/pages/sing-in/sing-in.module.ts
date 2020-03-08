import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingInPageRoutingModule } from './sing-in-routing.module';

import { SingInPage } from './sing-in.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingInPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SingInPage]
})
export class SingInPageModule {}

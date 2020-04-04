import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SingInPageRoutingModule } from './sing-in-routing.module';

import { SingInPage } from './sing-in.page';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SingInPageRoutingModule,
    ComponentsModule,
    FormsModule
  ],
  declarations: [SingInPage]
})
export class SingInPageModule {}

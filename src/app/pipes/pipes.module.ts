import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentPipe } from './moment.pipe';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    MomentPipe
  ],
  exports: [
    MomentPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class PipesModule { }

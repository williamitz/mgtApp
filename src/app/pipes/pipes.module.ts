import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentPipe } from './moment.pipe';
import { IonicModule } from '@ionic/angular';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';



@NgModule({
  declarations: [
    MomentPipe,
    DomSanitizerPipe
  ],
  exports: [
    MomentPipe,
    DomSanitizerPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class PipesModule { }

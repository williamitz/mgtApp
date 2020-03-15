import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ModalPostComponent } from './modal-post/modal-post.component';
import { NgForm, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    ModalPostComponent
  ],
  exports: [
    HeaderComponent,
    ModalPostComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }

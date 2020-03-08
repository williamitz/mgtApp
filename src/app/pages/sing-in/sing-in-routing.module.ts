import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingInPage } from './sing-in.page';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: SingInPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  exports: [RouterModule],
})
export class SingInPageRoutingModule {}

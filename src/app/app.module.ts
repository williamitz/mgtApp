import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { MomentPipe } from './pipes/moment.pipe';
import { PipesModule } from './pipes/pipes.module';


const CONFIG_SOCKET: SocketIoConfig = { url: environment.URL_SERVER, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot( CONFIG_SOCKET ),
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    PipesModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  public statusServer = false;
  constructor( private socket: Socket ) { }

  onCheckStatus() {
    this.socket.on('connect', async () => {

      console.log('conectado con servidor socket');
      // if ( ! this.statusServer ) {
      //   const res = await this.onLoadUserSingin();
      //   if (res.ok) {
      //     this.onSingInSocket( res.data );
      //   }
      // }
      this.statusServer = true;
    });

    this.socket.on('disconnect', () => {
      console.log('desconectado con servidor socket');
      this.statusServer = false;
    });
  }

  onSingInSocket( payload: LoginModel ) {
    this.onEmmit( 'sigin-client', payload, ( resWS ) => {
      console.log(resWS);
    });
  }

  onListen( event: string, callback?: Function ) {
    this.socket.on( event, callback );
  }

  onEmmit( event: string, payload: any, callback: Function ) {
    this.socket.emit( event, payload, callback );
  }

  onLoadUserSingin(): Promise<any> {
    return new Promise( (resolve) => {
      const data = JSON.parse( localStorage.getItem('dataUser') );
      if (!data) {
        resolve( { ok: false, message: 'No se encontró información del usuario' } );
      }

      resolve( { ok: true, data } );
    });
  }

}

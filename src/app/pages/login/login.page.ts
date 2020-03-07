import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  bodyLogin: LoginModel;

  constructor(private router: Router, private wsSevice: WebsocketService) { }

  ngOnInit() {
    
    this.bodyLogin = new LoginModel();

  }

  onLogin() {
    
    localStorage.setItem('dataUser', JSON.stringify( this.bodyLogin ));
    this.wsSevice.onSingInSocket( this.bodyLogin );
    this.router.navigate(['/home']);
  }

}

import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'frontPrueba';
  public identity;
  public token;
  public url;


  constructor( public _userService: UserService ){

    this.loadUser();
    this.url = global.url;
  }

  ngOnInit(){
    console.log('Webapp cargada correctamente');
  }

  // Actualiza la barra de navegación cuando hayan cambios
  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    // Almacena en identity al usuario identidicado mediante el método getIdentity();
    this.identity = this._userService.getIdentity();
    // Almacena el token mediante el método getToken();
    this.token = this._userService.getToken();
  }
}

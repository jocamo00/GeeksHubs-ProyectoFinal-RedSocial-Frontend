import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor( public _http: HttpClient ) {
    // Almacena la url global
    this.url = global.url;
  }


  test(){
    return "Hola mundo desde un servicio!";
  }

  // Método para el registro, le pasamos el objeto usuario, nos devolvera un observable
  register(user): Observable<any>{
    // Pasa el objeto user a json
    let json = JSON.stringify(user);
    // Parametros que se van a enviar a la API
    let params = 'json='+json;

    // Indica tipo de petición que se va a hacer
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Se hace la petición al backend, que será de tipo post
    // Se le pasa la url, los datos que queremos enviar y en un json se envia la cabecera
    return this._http.post(this.url+'user', params, {headers: headers});
  }

  // Método para el login, le pasamos el usuario
  // y gettoken, para sacer el token o el objeto user decodificado
  // este método devuelve un observable
  signup(user, gettoken = null): Observable<any>{
    // Comprueba si llega el token
    if(gettoken != null){
      user.gettoken = 'true';
    }

    let json = JSON.stringify(user);
    let params = 'json='+json;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'login', params, {headers: headers});
  }

  // Método que muestra el usuario identificado
  getIdentity(){
    // Saca lo que tenemos en identity y lo convierte a objeto
    let identity = JSON.parse(localStorage.getItem('identity'));

    // Si identity es true y diferente a undefined
    if(identity && identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    // Devuelve el objeto
    return this.identity;
  }

  // Método que muestra el token del usuario identificado
  getToken(){
    // Accede al token
    let token = localStorage.getItem('token');

    if(token && token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }
}

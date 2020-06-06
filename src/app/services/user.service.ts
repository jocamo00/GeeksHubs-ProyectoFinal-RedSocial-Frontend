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
}

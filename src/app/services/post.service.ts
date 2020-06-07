import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public url: string;

  constructor( private _http: HttpClient ) {
    this.url = global.url;
  }

  pruebas(){
    return "Hola desde el servicio de entradas";
  }

  // Método para crear un post
  // Se le pasa el token para identificar al usuario y el post que queremos guardar
  create(token, post): Observable<any>{
    // Pasa los datos del post de objeto a json
    let json = JSON.stringify(post);

    // Defini los parametros que se van a enviar
    let params = "json="+json;

    // Cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token); // Comprueba que el usuario este logeado correctamente

    return this._http.post(this.url + 'post', params, {headers: headers});
  }

  // listar todos los posts
  getPosts(): Observable<any>{
    // Indica tipo de content type
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'post', {headers: headers});
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;


  constructor( private _userService: UserService,
               private _router: Router,
               private _route: ActivatedRoute ) {

    this.page_title = 'Identificate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
   }

  ngOnInit(): void {
    // Se ejecuta siempre y cierra sesión solo cuando le llega
    // el parámetro sure por la url
    this.logout();
  }

  onSubmit(form){
    // Pasa el usuario que se esta logeando al método signup
    this._userService.signup(this.user).subscribe(
      response => {
        // Devuelve el token
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          // Devuelve el objeto usuario identificado
          this._userService.signup(this.user, true).subscribe(
            response => {
                this.identity = response;

                console.log(this.token);
                console.log(this.identity);

                // Almacena el token en localStorage
                localStorage.setItem('token', this.token);
                // Almacena el usuario en localStorage (lo pasamos a JSON)
                localStorage.setItem('identity', JSON.stringify(this.identity));

                // Redirección a inicio
                this._router.navigate(['']);
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout(){
    // Obtiene los parametros que llegan por url
    this._route.params.subscribe(params => {
        // Saca de la url el parametro sure y lo paso a formato numerico entero
        let logout = +params['sure'];

        // Si el valor es 1 deslogea al usuario
        if(logout == 1){
          // Borra la sesión de usuario y token
          localStorage.removeItem('identity');
          localStorage.removeItem('token');

          // Se vacian las propiedades
          this.identity = null;
          this.token = null;

          // Redirección a inicio
          this._router.navigate(['inicio']);
        }
    });

  }

}

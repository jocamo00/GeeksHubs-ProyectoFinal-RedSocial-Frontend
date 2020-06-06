import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor( private _userService: UserService ) {
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');

    /*
    public id:number,
    public name:string,
    public surname:string,
    public role:string,
    public email:string,
    public password:string,
    public description:string,
    public image:string,
     */
  }

  ngOnInit(): void {
    console.log('Componente de registro lanzado');
    console.log(this._userService.test());
  }

  onSubmit(form){

    // Se le pasa el objetor user que queremos mandarle a la API
    // Utiliza el métod subscribe del Observable que tiene dos funciones de callback
    // función que recibe la respuesta y función que recibe el error
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == "success"){
          this.status = response.status;
          form.reset();

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

}

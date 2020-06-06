import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status;


  constructor(
    private _userService: UserService

  ) {
    this.page_title = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    // Rellena el objeto usuario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image
    );

  }

  ngOnInit(): void {
  }

  onSubmit(form){
    // Le pasa token y usuario al método update del servicio para que actualice el usuario
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if(response && response.status){
          console.log(response);
          this.status = 'success';

          // Modifica el usuario en función de los cambios que hayan
          if(response.changes.name){
            this.user.name = response.changes.name;
          }
          if(response.changes.surname){
            this.user.surname = response.changes.surname;
          }
          if(response.changes.email){
            this.user.email = response.changes.email;
          }
          if(response.changes.description){
            this.user.description = response.changes.description;
          }
          if(response.changes.image){
            this.user.image = response.changes.image;
          }
          this.identity = this.user;

          // Actualiza el usuario en la localStorage
          localStorage.setItem('identity', JSON.stringify(this.identity));

        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error)
      }
    );
  }
}

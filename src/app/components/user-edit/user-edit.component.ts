import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';

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
  public url;
  public resetVar=true;

  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'user/upload',
      method:"POST",
      headers: {
     "Authorization" : this._userService.getToken()
      },
      responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu avatar'

};


  constructor( private _userService: UserService,
               private _router: Router

  ) {
    this.page_title = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;

    // Rellena el objeto usuario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      this.identity.password,
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

          // Redirección a inicio
          this._router.navigate(['inicio']);

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

  avatarUpload(datos){
    // Coge la respuesta en este caso la imagen, la pasa a objeto y la guarda en data
    let data = JSON.parse(datos.response);
    // Se le pasa la imagen al user
    this.user.image = data.image;
  }
}

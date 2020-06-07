import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  providers: [UserService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public status;
  public resetVar=true;

  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bPOSTold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:global.url+'post/upload',
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

  constructor( private _route: ActivatedRoute,
               private _router: Router,
               private _userService: UserService,
               private _postService: PostService) {

    this.page_title = 'Crear una entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    //console.log(this.post);
  }

  imageUpload(data){
    // Coge la respuesta en este caso la imagen, la pasa a objeto y la guarda en data
    let image_data = JSON.parse(data.response);
    // Se le pasa la imagen al user
    this.post.image = image_data.image;
  }

  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    )
  }

}

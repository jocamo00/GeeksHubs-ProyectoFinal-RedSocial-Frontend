import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public url;
  public posts: Array<Post>;
  public users: Array<User>;
  public identity;
  public token;

  constructor( private _postService: PostService,
               private _userService: UserService ) {

    this.page_title = 'Inicio';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
  }

  // Método para obtener los posts de la API
  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if(response.status == 'success'){
          // Guarda la respuesta que viene de la API con un array de posts
          this.posts = response.posts;
          console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      response => {
        // Vuelve a listar los posts
        this.getPosts();
      },
      error => {
        console.log(error);
      }
    );
  }

  // Método para obtener los usuarios de la API
  getUsers(){
    this._userService.getUsers().subscribe(
      response => {
        if(response.status == 'success'){
          // Guarda la respuesta que viene de la API con un array de users
          this.users = response.users;
          console.log(this.users);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}

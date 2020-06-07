import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
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
        // Cuando borra un post vuelve a cargar el listado de posts
        this.getPosts();
      },
      error => {
        console.log(error);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from '../../services/global';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {

  public url;
  public posts: Array<Post>;
  public users: Array<User>;
  public user: User;
  public identity;
  public token;

  constructor( private _postService: PostService,
               private _userService: UserService,
               private _route: ActivatedRoute,
               private _router: Router ) {

    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getProfile();
    this.getUsers();
  }

  getProfile(){
    // Saca el id que viene por la url
    this._route.params.subscribe(params => {
      let userId = +params['id'];

      this.getUser(userId);
      this.getPosts(userId);

    });
  }

  getUser(userId){
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.status == 'success'){
          // Guarda la respuesta que viene de la API con un array de posts
          this.user = response.user;
          console.log(this.user);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  // Método para obtener los posts de la API
  getPosts(userId){
    this._userService.getPosts(userId).subscribe(
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
        this.getProfile();

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

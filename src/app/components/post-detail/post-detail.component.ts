import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  public post: Post;

  constructor( private _postService: PostService,
               private _route: ActivatedRoute,
               private _router: Router ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    // Saca el id del post de la url
    // Accede a los parametros y mediante la función subscribe saca los parametros
    // params es un array que saca todos los parametros que se pasan por la url
    this._route.params.subscribe(params => {
      let id = +params['id']; // El + lo convierte en entero

      // Petición para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.post = response.posts;
            console.log(this.post);
          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/inicio']);
        }
      )
    });
  }

}

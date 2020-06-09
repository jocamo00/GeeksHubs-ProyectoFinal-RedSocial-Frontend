import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { ProfileComponent } from './components/profile/profile.component';

import { IdentityGuard } from './services/identity.guard';


const routes: Routes = [
  {path: '',                   component: HomeComponent},
  {path: 'inicio',             component: HomeComponent},
  {path: 'login',              component: LoginComponent},
  {path: 'logout/:sure',       component: LoginComponent},
  {path: 'registro',           component: RegisterComponent},
  {path: 'ajustes',            component: UserEditComponent, canActivate: [IdentityGuard]},
  {path: 'crear-entrada',      component: PostNewComponent, canActivate: [IdentityGuard]},
  {path: 'editar-entrada/:id', component: PostEditComponent, canActivate: [IdentityGuard]},
  {path: 'perfil/:id',         component: ProfileComponent},
  //{path: 'entrada/:id',      component: PostDetailComponent},
  {path: 'error',              component: ErrorComponent},
  {path: '**',                 component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

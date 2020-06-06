import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';


const routes: Routes = [
  {path: '',             component: HomeComponent},
  {path: 'inicio',       component: LoginComponent},
  {path: 'login',        component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'registro',     component: RegisterComponent},
  {path: 'ajustes',      component: UserEditComponent},
  {path: '**',           component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

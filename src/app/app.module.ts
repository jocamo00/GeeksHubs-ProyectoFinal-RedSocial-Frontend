import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';

import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    UserEditComponent,
    PostNewComponent,
    PostDetailComponent,
    PostEditComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AngularFileUploaderModule
  ],
  providers: [
    IdentityGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

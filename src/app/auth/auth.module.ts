import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AuthComponent} from "./auth/auth.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AdComponent} from "../main/ad/ad.component";
import {AdsService} from "../models/services/ads.service";

@NgModule({
  imports:[
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations:[
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    UserComponent,
    UserProfileComponent,
  ],
  providers:[
    AdComponent,
    AdsService
  ]
})
export class AuthModule{

}

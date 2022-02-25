import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {AclGuard} from "../guards/acl.guard";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children:[

      {
        path:'users/edit/:id',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'profile',
        component: UserProfileComponent,
      },
      {
        path:'',
        pathMatch: 'full',
        redirectTo: 'login'
      }
    ]
  }
];
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRoutingModule{

}

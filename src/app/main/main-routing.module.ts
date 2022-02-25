import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {AdComponent} from "./ad/ad.component";
import {AdReactiveFormComponent} from "./ad-reactive-form/ad-reactive-form.component";
import {AclGuard} from "../guards/acl.guard";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes=[
  {
    path:"",
    component:MainComponent,
    children:[
      {
        path: 'ads',
        component: AdComponent,
        canLoad:[AuthGuard]
      },
      {
        path:'ads/create',
        component: AdReactiveFormComponent,
        canActivate:[AclGuard]
      },
      {
        path:'ads/edit/:id',
        component: AdReactiveFormComponent,
        canActivate:[AclGuard]
      },
      {
        path:'',
        pathMatch: 'full',
        redirectTo:'ads'
      }
    ]
  }
]

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class MainRoutingModule{

}

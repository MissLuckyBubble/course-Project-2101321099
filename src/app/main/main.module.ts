import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MainRoutingModule} from "./main-routing.module";
import {AdItemComponent} from "./ad-item/ad-item.component";
import {AdComponent} from "./ad/ad.component";
import { AdReactiveFormComponent } from './ad-reactive-form/ad-reactive-form.component';
import {RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {AdsService} from "../models/services/ads.service";

@NgModule({
  imports:[
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MainRoutingModule
  ],
  declarations:[
    MainComponent,
    AdItemComponent,
    AdComponent,
    AdReactiveFormComponent
  ],
  exports:[
    AdComponent,
  ]
})
export class MainModule{

}

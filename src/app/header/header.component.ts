import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userIsLog: boolean = true;
  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    const loggedUser = this.authService.getUserfromStorage();
    if(loggedUser){
      this.userIsLog=true;
      return;
    }
    this.userIsLog = false;
  }
  ngOnChanges():void{
    location.reload();
  }

  onLogout() {
    this.authService.logout();
    this.userIsLog=false;
    this.router.navigate(['/auth','login'])
  }

  onProfile() {
    if(this.userIsLog){
    this.router.navigate(['/auth','profile']);
    }
    else this.router.navigate(['/auth','login']);
  }
}

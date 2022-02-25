import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AdComponent} from "../../main/ad/ad.component";
import {Ad} from "../../models/ad.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private adComp: AdComponent)
{ }

  ads!: Ad[];
  users!: User[];
  user!: User;
  errorMessage!:string;



  ngOnInit(): void {
    this.getContent();
  }
  private getContent():void{
    const loggedUser = this.authService.getUserfromStorage();
    if(loggedUser.id) {
      const userId = loggedUser.id;
      this.authService.getUsers$().subscribe({
        next: (UserResponse: User[]) => {
          this.user=UserResponse.find(user=> user.id == userId)!;
        },
        error: (response: HttpErrorResponse) => {
          this.errorMessage = response.message;
        }
      });
    }
  }

  onUserDelete(userId: number):void{
    this.authService.deleteUser$(userId).subscribe({
      next:()=>{
        this.adComp.editStatus(userId);
        this.authService.logout();
        this.router.navigate(['/auth','login']);
      }
    });
  }


}

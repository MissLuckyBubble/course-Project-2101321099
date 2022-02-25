import { Component, OnInit } from '@angular/core';
import {Ad} from "../../models/ad.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AdsService} from "../../models/services/ads.service";
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../auth/models/user.model";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  ads!: Ad[];
  errorMessage!: string;
  Message!: string;
  LikeMessage!:string;
  ApproveMessage!:string;
  users!:User[];
  user!:User;
  apllayed: boolean = false;
  isOrganization: boolean | undefined;


  constructor(private authService: AuthService,
    private adsService: AdsService,
             private router: Router) { }

  ngOnInit(): void {
    const loggedUser = this.authService.getUserfromStorage();
    if(loggedUser.role=="Организация"){
      this.isOrganization = true;
      }
    else this.isOrganization = false;
    this.getContent();
  }


  onAdDelete(adId: number):void{
    this.adsService.deleteAd$(adId).subscribe({
      next:()=>{
        this.ads = this.ads.filter(ad =>ad.id !== adId);
      }
    });
  }
  onAdLike(adId: number):void{
    const loggedUser = this.authService.getUserfromStorage();
    const userId = loggedUser.id!;
    this.adsService.getAds$().subscribe({
      next: () =>{
        for (let i in this.ads) {
          if (this.ads[i].id==adId && this.ads[i].likesUserId.find(e=>e===userId)==undefined) {
            this.ads[i].likes = this.ads[i].likes + 1;
            this.ads[i].likesUserId.push(userId);
            this.adsService.putAd$(this.ads[i]).subscribe({
              next: () => {
                this.LikeMessage = "Успешно харесахте обява: "+this.ads[i].title+"!";
                this.router.navigate(['/ads']);
              }
            });
          }

        else {
          this.LikeMessage="Вече сте харесали тази обява!"
            this.router.navigate(['/ads']);
          }
        }
      }
    });
  }

  onAdApplay(adId:number):void{
    const loggedUser = this.authService.getUserfromStorage();
    this.adsService.getAds$().subscribe({
      next: () =>{
        for(let i in this.ads){
          if(this.ads[i].id==adId) {
            if(this.ads[i].applays==null){
              this.apllayed = true;
            }
            else {
              for (let j in this.ads[i].applays) {
                if (this.ads[i].applays[j].id == loggedUser.id) {
                  this.apllayed = true;
                }
              }
            }
            if (!this.apllayed) {
              this.ads[i].applays.push(loggedUser);
              this.adsService.putAd$(this.ads[i]).pipe().subscribe({
                next: () => {
                  this.Message = "Успешно кандидастване";
                  this.router.navigate(['/ads'])
                }
              }).unsubscribe();
              this.addApplayToUser(this.ads[i]);
            }
          }
            else {
            this.Message = "Вече сте кандидаствали за тази обява!";
              this.router.navigate(['/ads']);
          }
        }
      }
    });
  }
  private addApplayToUser(ad:Ad){
    const loggedUser = this.authService.getUserfromStorage();
    this.user=loggedUser;

        this.user.applays.push(ad);
        this.authService.putUser$(this.user).subscribe({
          next:() => {
            this.Message = "Успешно кандидастване";
            localStorage.setItem('loggedUser', JSON.stringify(this.user));
            this.router.navigate(['/ads']);
          }
    });
  }

  private getContent(): void{
    this.adsService.getAds$().subscribe({
      next: (AdResponse: Ad[]) =>{
        this.ads = AdResponse;
      },
      error: (response:HttpErrorResponse) =>{
        this.errorMessage = response.message;
      }
    });
  }


  editStatus(userId: number):void{
    if(userId) {
      this.adsService.getAds$().subscribe({
        next: (AdResponse:Ad[]) => {
          this.ads = AdResponse;
          for (let i in this.ads) {
            if (this.ads[i].userid == userId && this.ads[i].status !="Неактивен") {
              console.log("namerena ad za promqna ");
              this.ads[i].status = "Неактивен";
              this.adsService.putAd$(this.ads[i]).subscribe({
                next: () => {
                  this.router.navigate(['/ads']);
                }
              });
            }
          }
        }
      });
    }
  }

  onAdEdit(adId: number):void {
    this.adsService.getAd$(adId).subscribe({
      next: () =>{
        this.ads =this.ads.filter((ad=>ad.id !==adId));
    }
    });
  }


  onUserApprove(user: User, ad:Ad) {
    if(ad.ApprovedUser == null) {
      ad.ApprovedUser = user;
      for (let i in user.applays){
        if(user.applays[i].id==ad.id){
          user.applays.splice(Number(i),1, ad);
        }
      }
      this.adsService.putAd$(ad).subscribe({
        next: () => {
          this.ApproveMessage = "Успешно одобрихте потребител: "+ user.name+"!";
          this.router.navigate(['/ads']);
        }
      });

    }
    else this.ApproveMessage = "Вече има одобрен подребител за тази обява!";
  }

}

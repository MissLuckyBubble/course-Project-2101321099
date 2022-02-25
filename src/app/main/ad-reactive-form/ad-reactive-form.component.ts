import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Ad} from "../../models/ad.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AdsService} from "../../models/services/ads.service";
import {of, switchMap} from "rxjs";
import {AuthService} from "../../auth/services/auth.service";
import {User} from "../../auth/models/user.model";

@Component({
  selector: 'app-ad-reactive-form',
  templateUrl: './ad-reactive-form.component.html',
  styleUrls: ['./ad-reactive-form.component.scss']
})
export class AdReactiveFormComponent implements OnInit {

  formGroup!: FormGroup;
  ad !:Ad;
  public users : User[] = [];
  user!: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adService: AdsService,
    private authService: AuthService
  ) {
    this.ad = {
      id:0,
      title: '',
      organizationName: '',
      more:'',
      userid:1,
      status:"",
      likes:0,
      likesUserId:[0],
      applays:this.users,
      ApprovedUser:this.user,
      type:"",
      category:'',
    }
  }

  get titleFormControl():FormControl{
    return this.formGroup?.get('title') as FormControl;
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params)=>{
        if(params['id']){
          return this.adService.getAd$((params['id']));
        }
        return of(null);
      })
    ).subscribe({
      next: (response) =>{
        if(response)
          this.ad = response;
          this.initForm();
      }
    });
  }

  onSubmit():void {

    const loggedUser = this.authService.getUserfromStorage();

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const ad: Ad = {
      id: this.formGroup.value.id,
      title: this.formGroup.value.title,
      organizationName: this.formGroup.value.organizationName,
      more: this.formGroup.value.more,
      userid: loggedUser.id!,
      status: "Активен",
      likes: 0,
      applays:this.users,
      likesUserId: [0],
      ApprovedUser:this.user,
      category:this.formGroup.value.category,
      type:this.formGroup.value.type
    }
    let request$;

    if(ad.id){
      //update
      request$=this.adService.putAd$(ad);
    }
    else{
      //create
      request$ = this.adService.postAds$(ad);
    }

    request$.subscribe({
      next:()=>{
        this.router.navigate(['/ads'])
      }
    });
  }

  private initForm(): void{
    this.formGroup = this.fb.group({
      id:this.ad.id,
      title:[this.ad.title,[Validators.required]],
      organizationName:[this.ad.organizationName,Validators.required],
      more:this.ad.more,
      status:"Активен",
      ApprovedUser:this.ad.ApprovedUser,
      category:this.ad.category,
      type:this.ad.type
    });
  }
}

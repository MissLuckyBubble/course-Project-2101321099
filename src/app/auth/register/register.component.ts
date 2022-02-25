import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import {Ad} from "../../models/ad.model";
import {of, switchMap} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;
  user !: User;
  Roles: string[] = ['Потребител','Организация'];
  public ads : Ad[] = [];

  changeRole(e: any){
    this.formGroup.value.role?.setValue(e.target.value)
  }
  get role(){
    return this.formGroup?.get('role');
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

    this.user={
      username:'',
      email:'',
      password:'',
      name:'',
      role:'',
      applays:this.ads
    }
  }



  get usernameFormControl():FormControl{
    return this.formGroup?.get('username') as FormControl;
  }
  get passFormControl():FormControl{
    return this.formGroup?.get('password') as FormControl;
  }
  get roleFormControl():FormControl{
    return  this.formGroup?.get('role') as FormControl;
  }
  get emailFormControl():FormControl{
    return this.formGroup?.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params)=>{
      if(params['id']){
        console.log(this.authService.getUser$(params['id']));
        return this.authService.getUser$(params['id']);
      }
      return of(null);
    })).subscribe({
      next:(response)=>{
       if(response)
         this.user = response;
        this.initForm();
      }
    });
  }

  onSubmit() {

    if(this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    const user: User = {
      id:this.formGroup.value.id,
      username: this.formGroup.value.username,
      email: this.formGroup.value.email,
      name:this.formGroup.value.name,
      password:this.formGroup.value.password,
      role:this.role?.value,
      applays:this.ads
    }
    let request$
    if(user.id){
      request$=this.authService.putUser$(user);
    }
    else{
      request$= this.authService.postUser$(user);
    }
     request$.subscribe({
      next: ()=>{
        this.router.navigate(['/auth','login']);
      }
    });
  }
  private initForm(): void{
    this.formGroup = this.fb.group({
      id:this.user.id,
      username:[this.user.username,Validators.required],
      password: [this.user.password, Validators.required],
      role:[this.user.role,Validators.required],
      email:[this.user.email, Validators.required],
      name:this.user.name,
      applays:this.user.applays
    });
  }
}

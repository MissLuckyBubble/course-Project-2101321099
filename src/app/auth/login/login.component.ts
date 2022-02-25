import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  LoginMessage!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {


  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  get usernameFormControl():FormControl{
    return this.formGroup?.get('username') as FormControl;
  }
  get passFormControl():FormControl{
    return this.formGroup?.get('password') as FormControl;
  }
  ngOnChanges():void{
    location.reload();
  }
  onSubmit(): void{
    // 1. login request
    this.authService.login$(this.formGroup.value).subscribe({
      next: (response) =>{
        if (response) {
          // 2. store data, local-storage
          this.authService.storeUserData(response);

          // 3. navigate inside system
          this.router.navigate(['/']);
        }
        else this.LoginMessage="Грешни потребителски данни!";
      }
    })






  }
}

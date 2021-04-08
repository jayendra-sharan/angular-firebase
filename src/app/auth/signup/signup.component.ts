import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../auth.style.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup
  hide = true;

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['',
        [Validators.minLength(6),
        Validators.maxLength(25)]
      ]
    })
  }

  ngOnInit(): void {
  }
  
  public get email(): AbstractControl {
    return this.signUpForm.get('email')
  }

  
  public get password(): AbstractControl{
    return this.signUpForm.get('password')
  }

  signUp() {
    return this.auth.emailSignUp(this.email.value, this.password.value )
      .then(user => {
        if (this.signUpForm.valid) {
          this.router.navigate(['/'])
        }
      })
  }
  
  
}

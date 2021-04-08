import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup
  hide = true;

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      passwoord: ['',
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
    })
  }

  ngOnInit(): void {
  }

  
  public get email() {
    return this.signInForm.get('email')
  }

  
  public get password(){
    return this.signInForm.get('password')
  }

  signIn() {
    return this.auth.emailSignIn(this.email.value, this.password.value )
      .then(user => {
        if (this.signInForm.valid) {
          this.router.navigate(['/'])
        }
      })
  }
  
  
}

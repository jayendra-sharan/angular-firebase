import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('You have successfully signed in.')
      }).catch (error => console.log(error.message));
  }

  signOut() {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate([])
      });
  }
}

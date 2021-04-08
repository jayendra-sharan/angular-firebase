import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import 'firebase/auth';

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Md5 } from 'ts-md5';
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
      .then(() => console.log('You have successfully signed in.'))
      .catch(error => console.log(error.message))
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.updateUserData(user);
        console.log('Welcome, your account has been created.')
      })
      .catch(error => console.log(error.message))
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate([]);
    });
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => console.log('Password reset link sent'))
      .catch(error => console.log(error.message))

  }

  private updateUserData({user}) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName,
      photoURL: user.photoURL || `http://www.gravatar.com/avatar/${Md5.hashStr(user.uid)}?d=identicon`
    }
    return userRef.set(data, {merge: true})
  }
}

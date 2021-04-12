import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore"
import { AuthService } from '../core/auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection
  userDoc: AngularFirestoreDocument<User>

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) { }

  getUsers() {
    this.userCollection = this.afs.collection('users');
    return this.userCollection.valueChanges();
  }

  getUser(id: string) {
    this.userDoc = this.afs.doc<User>(`users/${id}`)
    return this.userDoc.valueChanges();
  }

  updateProfileData(displayName: string, photoURL: string) {
    const user = this.auth.authState;
    const data = { displayName, photoURL };
    console.log(data);
    return user.updateProfile(data)
      .then(() => this.afs.doc(`/users/${user.uid}`).update({
        displayName,
        photoURL
      }))
      .then(() => console.log('Your profile has been updated'))
      .catch((error: any) => console.log(error.message))
  }

  updateEmail(email: string) {
    const user = this.auth.authState;
    return user.updateEmail(email)
      .then(() => this.afs.doc(`/users/${user.uid}`).update({email}))
      .then(() => console.log('Your email address has been updated', email))
      .catch((error: any) => console.log(error.message))
  }

  updateUserData(data:any) {
    const uid = this.auth.currentUserId;
    return this.afs.doc(`/users/${uid}`).update(data);
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore"
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection
  userDoc: AngularFirestoreDocument<User>

  constructor(
    private afs: AngularFirestore
  ) { }

  getUsers() {
    this.userCollection = this.afs.collection('users');
    return this.userCollection.valueChanges();
  }

  getUser(id: string) {
    this.userDoc = this.afs.doc<User>(`users/${id}`)
    return this.userDoc.valueChanges();
  }
}

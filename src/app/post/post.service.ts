import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection: AngularFirestoreCollection

  constructor(
    private afs: AngularFirestore
  ) {
    this.postCollection = this.afs.collection("posts", ref => ref.orderBy("claps", "desc").limit(10))
  }

  create(data: Post) {
    return this.postCollection.add(data)
  }
}

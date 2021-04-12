import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: AngularFirestoreCollection

  constructor(
    private afs: AngularFirestore
  ) {
    this.postsCollection = this.afs.collection("posts", ref => ref.orderBy("claps", "desc").limit(10))
  }

  create(data: Post) {
    return this.postsCollection.add(data)
  }

  getPosts(): Observable<Post[]> {
    return this.postsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    )
  }
}

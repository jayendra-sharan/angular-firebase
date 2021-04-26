import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { MessageService } from './message.service';
import { Thread } from './thread.model';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  threadsCollection: AngularFirestoreCollection<Thread>
  threadDoc: AngularFirestoreDocument<Thread>

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private messageService: MessageService,
  ) { }

  getThreads() {
    const currentUserId = this.auth.currentUserId;
    this.threadsCollection = this.afs.collection(
      `chats`,
      ref => ref.where(`members.${this.auth.currentUserId}`, "==", true)
    );
    return this.threadsCollection.valueChanges();
  }

  getThread(profileId: string) {
    this.threadDoc = this.afs.doc<Thread>(`chats/${profileId}`);
    return this.threadDoc.valueChanges(); 
  }

  createThread(profileId: string) {
    const currentUserId = this.auth.currentUserId;

    const id = profileId < currentUserId
    ? `${profileId}_${currentUserId}`
    : `${currentUserId}_${profileId}`

    const avatar = this.auth.authState.photoURL;

    const members = {
      [profileId]: true,
      [currentUserId]: true,
    };

    const creator = this.auth.authState.displayName || this.auth.authState.email;
    const lastMessage = null;

    const thread: Thread = {
      id,
      avatar,
      members,
      creator,
      lastMessage
    };

    const threadPath = `chats/${id}`;

    return this.afs.doc(threadPath).set(thread, { merge: true });
  }

  saveLastMessage (channelId: string, message: string) {
    const data = {
      lastMessage: message,
    }
    return this.afs.doc(`chats/${channelId}`).set(data, { merge: true });
  }

  async deleteThread(threadId: string) {
    const batch = this.afs.firestore.batch();
    const query = await this.afs.collection(`chats/${threadId}/messages`).ref.get();

    console.log('Thread ID', threadId);
    console.log(query);

    query.forEach(doc => {
      console.log(doc);
      console.log('Deleting ', doc.ref);
      // batch.delete(doc.ref);
    })
    // batch.commit().then(() => {
    //   this.afs.doc(`chats/${threadId}`).delete();
    // })
  }
}

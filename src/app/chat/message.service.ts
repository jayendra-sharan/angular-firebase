import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messagesCollection: AngularFirestoreCollection<Message>
  messageDoc: AngularFirestoreDocument<Message>

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) { }

  getMessages(channelId: string) {
    this.messagesCollection = this.afs.collection(
      `chats/${channelId}/messages`,
      ref => ref.orderBy('timestamp')
    )
    return this.messagesCollection.valueChanges();
  }

  sendMessage(
    channelId: string,
    photoURL: string,
    sender: string,
    senderId: string,
    content: string
  ) {
    const data = {
      photoURL,
      sender,
      senderId,
      content,
      timestamp: new Date()
    }
    return this.afs.collection(`chats/${channelId}/messages`).add(data)
      .then(() => console.log('Message sent!'))
      .catch(error => console.log('Error'))
  }
}

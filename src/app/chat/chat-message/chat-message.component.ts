import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;

  incoming: boolean

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  this.checkIncoming();
  }

  checkIncoming() {
    const currentUserId = this.auth.currentUserId;
    if (this.message.sender && currentUserId) {
      this.incoming = this.message.senderId !== currentUserId
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Thread } from '../thread.model';
@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {

  @Input() thread: Thread

  constructor(
  ) { }

  ngOnInit(): void {
  }

}

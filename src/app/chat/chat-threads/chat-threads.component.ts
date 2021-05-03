import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {

  threads: Observable<Thread[]>

  constructor(
    private threadService: ThreadService
  ) { }

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads() {
    this.threads = this.threadService.getThreads();
  }

}

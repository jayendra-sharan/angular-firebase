import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Thread } from '../thread.model';
import { ThreadService } from '../thread.service';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements OnInit {
  
  @ViewChild('scroller') private feed: ElementRef;

  threads: Observable<Thread[]>
  threadId: string
  
  constructor(
    public el: ElementRef,
    private threadService: ThreadService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getThreadId();
  }

  getThreadId() {
    this.threadId = this.router.snapshot.paramMap.get('id');
  }

  delete() {
    this.threadService.deleteThread(this.threadId)
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el.nativeElement.querySelector('.chat-feed');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadService } from 'src/app/chat/thread.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private threadService: ThreadService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe((user: User) => this.user = user);
  }

  chat() {
    const profileId = this.route.snapshot.paramMap.get('id');
    return this.threadService.createThread(profileId)
      .then(() => console.log('Thread created!'))
      .catch(error => console.log('Error', error.message))
  }

}

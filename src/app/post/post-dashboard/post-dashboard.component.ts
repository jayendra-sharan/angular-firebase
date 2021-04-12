import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  
  postForm: FormGroup
  imageURL: string
  
  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.minLength(3), Validators.maxLength(40)]],
      content: [''],
      draft: false
    })
  }

  savePost() {
    const formData: Post = {
      author: this.auth.currentUserId,
      title: this.postForm.get('title').value,
      image: this.imageURL || null,
      content: this.postForm.get('content').value,
      draft: this.postForm.get('draft').value,
      published: new Date(),
      claps: 0
    }

    if (!this.postForm.untouched) {
      this.postForm.reset();
      return this.postService.create(formData)
    }
  }
}

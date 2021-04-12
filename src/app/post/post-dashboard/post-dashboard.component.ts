import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  imageURL: string
  
  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: AngularFireStorage
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
      authorId: this.auth.currentUserId,
      author: this.auth.authState.displayName || this.auth.authState.email,
      title: this.postForm.get('title').value,
      image: this.imageURL || null,
      content: this.postForm.get('content').value,
      draft: this.postForm.get('draft').value || false,
      published: new Date(),
      trending: 0
    }

    if (!this.postForm.untouched) {
      this.postForm.reset();
      this.imageURL = '';
      return this.postService.create(formData)
    }
  }

  uploadPostImage(event: any) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== "image") {
      return alert('Only images allowed.');
    } else {
      const task: AngularFireUploadTask = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.imageURL = url;
          })
        })
      ).subscribe();
    }
  }
}

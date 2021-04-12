import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  
  editing: boolean = false;
  @Input() post: Post
  uploadPercent: Observable<number>
  downloadURL: Observable<string>
  imageURL: string
  
  constructor(
    private postService: PostService,
    public auth: AuthService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  delete(id: string) {
    this.postService.delete(id);
  }

  update() {
    const formData = {
      title: this.post.title,
      image: this.imageURL || this.post.image,
      content: this.post.content,
      dfaft: this.post.draft,
    }
    this.postService.update(this.post.id, formData);
    this.editing = false;
  }
  
  trending(value: number) {
    if (this.post.id) {
      this.postService.update(this.post.id, { trending: value + 1});
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

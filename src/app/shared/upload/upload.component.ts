import { Component, Input, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selection: FileList

  @Input() path: string
  @Input() meta: string
  @Input() uploadType: boolean

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
  }

  detect(event) {
    this.selection = event.target.files
  }

  upload() {
    const file = this.selection[0];

    if (file.type.split('/')[0] === "image") {
      this.uploadService.uploadTask(this.path, file, this.meta, this.uploadType);
    } else {
      console.error('Please add only images.');
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  downloadURL: Observable<string>
  uploadPercent: Observable<number>

  uploads: AngularFirestoreCollection<any>

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  uploadTask(path: string, file: File, meta, uploadType: boolean) {
    const nameHash = Md5.hashStr(file.name + new Date().getTime())
    const fileExt = file.type.split("/")[1];
    const name = `${nameHash}.${fileExt}`;

    const ref = this.storage.ref(`${path}/${name}`);

    const task = ref.put(file, { customMetadata: meta });

    this.uploadPercent = task.percentageChanges();

    this.uploads = this.afs.collection(path);

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          const data = { name, url };
          if (uploadType) {   // saves as collection
            this.uploads.add(data);
          } else {            // saves as a document
            this.afs.doc(path).update({ url });
          }
        });
      })
    ).subscribe();
  }
}

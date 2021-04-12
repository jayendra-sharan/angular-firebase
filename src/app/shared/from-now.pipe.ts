import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: any, ...args: any): string {
    return typeof value === "object"
    ? moment(value.seconds * 1000).fromNow()
    : moment(value).fromNow();
  }

}

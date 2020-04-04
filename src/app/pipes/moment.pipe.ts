import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

moment.locale('es');

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: string): any {
    return moment(value).fromNow();
  }

}

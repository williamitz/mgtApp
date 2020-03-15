import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: string): any {
    console.log(value);
    moment.locale('es');
    return moment(value).fromNow();
  }

}

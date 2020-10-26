import { Pipe, PipeTransform } from '@angular/core';
import { Score } from './score.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(value: any, property: any) {
        return value.sort((a,b) => {
            if (a[property] > b[property]) {
              return 1;
            } else {
              return -1;
            }
        });
    }

}
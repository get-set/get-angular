import {Pipe, PipeTransform} from '@angular/core';
import {Stock} from './stock.service';

@Pipe({
  name: 'stockFilter'
})
export class StockFilterPipe implements PipeTransform {

  transform(list: Stock[], field: string, keyword: string): any {
    if (!field || !keyword) {
      return list;
    }

    return list.filter(item =>
      item[field].toLowerCase().indexOf(keyword) >= 0
    );
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], filterdata: string): any[] {
    if(!items) return [];
    if(!filterdata) return items;
    filterdata = filterdata.toString().toLowerCase();
    return items.filter( it => {
      return it.categoryName.toLowerCase()?.includes(filterdata);
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {
    if (value.length === 0 || filterString === ''){
      return value;
    }
    const address: any[] = [];
    for (const add of value){
      if (add.toString().toLowerCase().indexOf(filterString.toLowerCase()) !== -1){
        address.push(add);
      }
    }
    return address;
  }

}

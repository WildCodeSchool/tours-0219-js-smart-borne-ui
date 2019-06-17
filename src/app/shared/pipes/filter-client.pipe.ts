import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClient',
})
export class FilterClientPipe implements PipeTransform {

  // tslint:disable-next-line:prefer-array-literal
  transform(items: Array<any>,
            filterId: string,
            filterName: string,
            filterRaisonSocial: string) {
    if (items && items.length) {
      return items.filter((item) => {
        if (filterId && item._id.toLowerCase().indexOf(filterId.toLowerCase()) === -1) {
          return false;
        }
        if (filterName && item.name.toLowerCase().indexOf(filterName.toLowerCase()) === -1) {
          return false;
        }
        if (filterRaisonSocial && item.raisonSocial.toLowerCase().indexOf(filterRaisonSocial.toLowerCase()) === -1) {
          return false;
        }
        return true;
      });
    }

    return items;

  }

}

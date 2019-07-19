import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOffer',
})
export class FilterOfferPipe implements PipeTransform {

  // tslint:disable-next-line:prefer-array-literal
  transform(items: Array<any>,
            filterId: string,
            filterPseudo: string,
            filterClient: string,
            filterRemise: string,
           ) {
    if (items && items.length) {
      return items.filter((item) => {
        if (filterId && item._id.toLowerCase().indexOf(filterId.toLowerCase()) === -1) {
          return false;
        }
        if (filterPseudo && item.pseudo.toLowerCase().indexOf(filterPseudo.toLowerCase()) === -1) {
          return false;
        }
        if (filterClient && item.client.toLowerCase().indexOf(filterClient.toLowerCase()) === -1) {
          return false;
        }
        if (filterRemise && item.remise.toLowerCase().indexOf(filterRemise.toLowerCase()) === -1) {
          return false;
        }
        return true;
      });
    }

    return items;

  }

}

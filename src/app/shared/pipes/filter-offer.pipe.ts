import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOffer',
})
export class FilterOfferPipe implements PipeTransform {

  // tslint:disable-next-line:prefer-array-literal
  transform(items: Array<any>,
            filterId: string,
            filterClient: string,
            filterRemise: string,
            filterDebut: string,
            filterFin: string) {
    if (items && items.length) {
      return items.filter((item) => {
        if (filterId && item._id.toLowerCase().indexOf(filterId.toLowerCase()) === -1) {
          return false;
        }
        if (filterClient && item.client.toLowerCase().indexOf(filterClient.toLowerCase()) === -1) {
          return false;
        }
        if (filterRemise && item.remise.toString().indexOf(filterRemise.toString()) === -1) {
          return false;
        }
        if (filterDebut && item.contrat.debut.toLowerCase().indexOf(filterDebut.toLowerCase()) === -1) {
          return false;
        }
        if (filterFin && item.contrat.fin.toLowerCase().indexOf(filterFin.toLowerCase()) === -1) {
          return false;
        }
        return true;
      });
    }

    return items;

  }

}

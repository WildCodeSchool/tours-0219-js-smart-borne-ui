import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBorne',
})
export class FilterBornePipe implements PipeTransform {

  // tslint:disable-next-line:prefer-array-literal
  transform(items: Array<any>,
            filterNumeroSerie: string,
            filterVille: string,
            filterBac1: string,
            filterBac2: string,
            filterTotal: string) {
    if (items && items.length) {
      return items.filter((item) => {
        if (filterNumeroSerie && item.numeroSerie.toLowerCase().indexOf(filterNumeroSerie.toLowerCase()) === -1) {
          return false;
        }
        if (filterVille && item.address.ville.toLowerCase().indexOf(filterVille.toLowerCase()) === -1) {
          return false;
        }
        if (filterBac1 && item.cannette.utilise.toString().indexOf(filterBac1.toString()) === -1) {
          return false;
        }
        if (filterBac2 && item.plastique.utilise.toString().indexOf(filterBac2.toString()) === -1) {
          return false;
        }
        if (filterTotal && item.coupon.restant.toString().indexOf(filterTotal.toString()) === -1) {
          return false;
        }
        return true;
      });
    }

    return items;

  }

}

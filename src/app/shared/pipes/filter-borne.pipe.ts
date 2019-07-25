import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBorne',
})
export class FilterBornePipe implements PipeTransform {

  // tslint:disable-next-line:prefer-array-literal
  transform(items: Array<any>,
            filterNumeroSerie: string,
            filterPseudo: string,
            filterVille: string,
            filterPlastique: string,
            filterMetal: string,
            filterTotal: string) {
    if (items && items.length) {
      return items.filter((item) => {
        if (filterNumeroSerie && item.numeroSerie.toLowerCase().indexOf(filterNumeroSerie.toLowerCase()) === -1) {
          return false;
        }
        if (filterPseudo && item.pseudo.toLowerCase().indexOf(filterPseudo.toLowerCase()) === -1) {
          return false;
        }
        if (filterVille && item.address.ville.toLowerCase().indexOf(filterVille.toLowerCase()) === -1) {
          return false;
        }
        if (filterPlastique && item.plastique.taux.toString().indexOf(filterPlastique.toString()) === -1) {
          return false;
        }
        if (filterMetal && item.metal.taux.toString().indexOf(filterMetal.toString()) === -1) {
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

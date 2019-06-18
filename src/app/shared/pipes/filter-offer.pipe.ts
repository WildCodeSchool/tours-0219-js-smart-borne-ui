import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOffer',
})
export class FilterOfferPipe implements PipeTransform {

  // tslint:disable-next-line:prefer-array-literal
  transform(items: Array<any>,
            filterId: string,
            filterClient: string,
            filterCouponImprimer: string,
            filterCouponTotal: string,
            filterDebutOffre: string) {
    if (items && items.length) {
      return items.filter((item) => {
        if (filterId && item.id.toLowerCase().indexOf(filterId.toLowerCase()) === -1) {
          return false;
        }
        if (filterClient && item.coupon.toLowerCase().indexOf(filterClient.toLowerCase()) === -1) {
          return false;
        }
        if (filterCouponImprimer && item.cannette.utilise.toString().indexOf(filterCouponImprimer.toString()) === -1) {
          return false;
        }
        if (filterCouponTotal && item.plastique.utilise.toString().indexOf(filterCouponTotal.toString()) === -1) {
          return false;
        }
        if (filterDebutOffre && item.coupon.restant.toString().indexOf(filterDebutOffre.toString()) === -1) {
          return false;
        }
        return true;
      });
    }

    return items;

  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser',
})
export class FilterUserPipe implements PipeTransform {

  // tslint:disable-next-line:prefer-array-literal
  transform(items: Array<any>,
            filterId: string,
            filterLastname: string,
            filterEmail: string,
            filterRole: string) {
    if (items && items.length) {
      return items.filter((item) => {
        if (filterId && item._id.toLowerCase().indexOf(filterId.toLowerCase()) === -1) {
          return false;
        }
        if (filterLastname && item.username.toLowerCase().indexOf(filterLastname.toLowerCase()) === -1) {
          return false;
        }
        if (filterEmail && item.email.toLowerCase().indexOf(filterEmail.toLowerCase()) === -1) {
          return false;
        }
        if (filterRole && item.role.toLowerCase().indexOf(filterRole.toLowerCase()) === -1) {
          return false;
        }
        return true;
      });
    }

    return items;

  }

}

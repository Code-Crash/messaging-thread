import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../common/shared.service';

@Pipe({
  name: 'getUserName'
})
export class GetUserNamePipe implements PipeTransform {

  constructor(private service: SharedService) { }

  transform(message: any, ...args: any[]): any {
    const type = args[0] || 'from';
    return this.getUserName(message, type);
  }

  getUserName(message: any, type: string) {
    let user: any = {};
    if (type === 'from') {
      user = this.service.getFromUser(message);
    } else {
      user = this.service.getToUser(message);
    }
    return user && user.first_name && user.last_name ? user.first_name + ' ' + user.last_name : 'NA';
  }

}


import { Pipe, PipeTransform } from '@angular/core';
import { Group, GroupsService } from '../admin/groups/groups.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'getGroupName'
})
export class GetGroupNamePipe implements PipeTransform {

  constructor(public groupsService: GroupsService) {

  }

  transform(value: any, args?: any): any {
    if (!value) {
      return Observable.of(null);
    }
    return this.groupsService.getGroup(<Group>{$key: value})
      .snapshotChanges()
      .pipe(
        map(object => {
          return object.payload.val().name;
        })
      );
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Group, GroupsService } from '../groups/groups.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'getGroupName'
})
export class GetGroupNamePipe implements PipeTransform {

  constructor(public groupsService: GroupsService) {

  }

  transform(value: any, args?: any): any {
    return this.groupsService.getGroup(<Group>{$key: value})
      .snapshotChanges()
      .pipe(
        map(object => {
          return object.payload.val().name;
        })
      );
  }

}

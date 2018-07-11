import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTeamName'
})
export class GetTeamNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

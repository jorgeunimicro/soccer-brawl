import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ToastService } from '../../shared/toast.service';

export class Group {
  $key: string;
  name: string;
  type: 'group'|'top16'|'quaterfinal'|'semifinal'|'final'|'third-fourth' = 'group';
}

@Injectable()
export class GroupsService {

  private basepath = '/groups'

  matches: AngularFireList<Group> = null;
  match: AngularFireObject<Group> = null;

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastService
  ) { }

  getGroups(): AngularFireList<Group> {
    this.matches = this.db.list<Group>(this.basepath);
    return this.matches;
  }

  getGroup(group: Group): AngularFireObject<Group> {
    const path = `${this.basepath}/${group.$key}`;
    this.match = this.db.object(path);
    return this.match;
  }

  createGroup(group: Group): void {
    try {
      this.matches.push(group);
    } catch (e) {
      this.toastr.open(e);
    }
  }

  updateGroup(group: Group): void {
    this.matches.update(group.$key, <Group>{
      name: group.name,
      type: group.type
    })
      .catch(error => this.toastr.open(error));
  }

  deleteGroup(group: Group): void {
    this.matches.remove(group.$key)
      .catch(error => this.toastr.open(error));
  }
}

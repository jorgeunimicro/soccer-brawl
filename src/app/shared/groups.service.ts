import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ToastService } from './toast.service';

export class Group {
  $key: string;
  name: string;
}

@Injectable()
export class GroupsService {

  private basepath = '/groups'

  groups: AngularFireList<Group> = null;
  group: AngularFireObject<Group> = null;

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastService
  ) { }

  getGroups(): AngularFireList<Group> {
    this.groups = this.db.list<Group>(this.basepath);
    return this.groups;
  }

  getTeam(group: Group): AngularFireObject<Group> {
    const path = `${this.basepath}/${group.$key}`;
    this.group = this.db.object(path);
    return this.group;
  }

  createGroup(group: Group): void {
    try {
      this.groups.push(group);
    } catch (e) {
      this.toastr.open(e);
    }
  }

  updateGroup(group: Group): void {
    this.groups.update(group.$key, <Group>{ name: group.name})
      .catch(error => this.toastr.open(error));
  }

  deleteTeam(group: Group): void {
    this.groups.remove(group.$key)
      .catch(error => this.toastr.open(error));
  }
}

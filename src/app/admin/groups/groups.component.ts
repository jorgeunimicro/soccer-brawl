import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Group, GroupsService } from './groups.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: Observable<Group[]>;
  editingGroups = [];
  displayedColumns = ['index', 'name', 'type', 'actions'];

  constructor(private groupsService: GroupsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.groups = this.groupsService.getGroups()
      .snapshotChanges()
      .switchMap(list => {
        return Observable.of(list.map(item => {
          const group = item.payload.toJSON();
          group['$key'] = item.payload.key;
          return <Group>group;
        }));
      });

  }

  addGroup(groupName: string) {
    const group = new Group();
    group.name = groupName;
    this.groupsService.createGroup(group);
  }

  editing(group) {
    return this.editingGroups.indexOf(group) >= 0;
  }

  editGroup(group) {
    this.editingGroups.push(group);
  }

  saveGroup(group) {
    this.groupsService.updateGroup(group);
    this.editingGroups = this.editingGroups.filter(item => item !== group);
  }

  deleteGroup(group) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, <MatDialogConfig>{
      data: {
        itemDescription: group.name,
        title: 'Delete group'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.groupsService.deleteGroup(group);
      }
    });
  }
}

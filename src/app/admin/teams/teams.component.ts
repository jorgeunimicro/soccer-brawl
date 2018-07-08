import { Component, OnInit } from '@angular/core';
import { Team, TeamsService } from './teams.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Group, GroupsService } from '../groups/groups.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Observable<Team[]>;
  groups: Observable<Group[]>;
  editingTeams = [];
  displayedColumns = ['index', 'name', 'group', 'actions'];

  constructor(
    private teamsService: TeamsService,
    private groupsService: GroupsService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.teams = this.teamsService.getTeams()
      .snapshotChanges()
      .switchMap(list => {
        return Observable.of(list.map(item => {
          const team = item.payload.toJSON();
          team['$key'] = item.payload.key;
          return <Team>team;
        }));
      });
    this.groups = this.groupsService.getGroups()
      .snapshotChanges()
      .pipe(
        map(list => {
          return list.map(item => {
            const group = item.payload.toJSON();
            group['$key'] = item.payload.key;
            return <Group>group;
          });
        }),
        map(list => {
          return list.filter(item => item.type === 'group');
        })
      );
  }

  addTeam(teamName: string) {
    const team = new Team();
    team.name = teamName;
    team.groupId = null;
    this.teamsService.createTeam(team);
  }

  editing(team) {
    return this.editingTeams.indexOf(team) >= 0;
  }

  editTeam(team) {
    this.editingTeams.push(team);
  }

  saveTeam(team) {
    this.teamsService.updateTeam(team);
    this.editingTeams = this.editingTeams.filter(item => item.name !== team.name);
  }

  deleteTeam(team) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, <MatDialogConfig>{
      data: {
        itemDescription: team.name,
        title: 'Delete team'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.teamsService.deleteTeam(team);
      }
    });
  }
}

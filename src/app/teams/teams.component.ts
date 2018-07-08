import { Component, OnInit } from '@angular/core';
import { Team, TeamsService } from '../shared/teams.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Observable<Team[]>;
  editingTeams = [];
  displayedColumns = ['index', 'name', 'actions'];

  constructor(private teamsService: TeamsService, private dialog: MatDialog) {
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

  }

  addTeam(teamName: string) {
    const team = new Team();
    team.name = teamName;
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

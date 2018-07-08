import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ToastService } from './toast.service';

export class Team {
  $key: string;
  name: string;
}

@Injectable()
export class TeamsService {

  private basepath = '/teams'

  teams: AngularFireList<Team> = null;
  team: AngularFireObject<Team> = null;

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastService
  ) { }

  getTeams(): AngularFireList<Team> {
    this.teams = this.db.list<Team>(this.basepath);
    return this.teams;
  }

  getTeam(team: Team): AngularFireObject<Team> {
    const path = `${this.basepath}/${team.$key}`;
    this.team = this.db.object(path);
    return this.team;
  }

  createTeam(team: Team): void {
    try {
      this.teams.push(team);
    } catch (e) {
      this.toastr.open(e);
    }
  }

  updateTeam(team: Team): void {
    this.teams.update(team.$key, <Team>{ name: team.name})
      .catch(error => this.toastr.open(error));
  }

  deleteTeam(team: Team): void {
    this.teams.remove(team.$key)
      .catch(error => this.toastr.open(error));
  }
}

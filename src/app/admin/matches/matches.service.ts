import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { ToastService } from '../../shared/toast.service';

export class Match {
  $key: string;
  teamAId: string;
  teamBId: string;
  groupId: string;
  resultA: number;
  resultB: number;
  date: string;
}

@Injectable()
export class MatchesService {

  private basepath = '/matches'

  matches: AngularFireList<Match> = null;
  match: AngularFireObject<Match> = null;

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastService
  ) { }

  getMatches(): AngularFireList<Match> {
    this.matches = this.db.list<Match>(this.basepath);
    return this.matches;
  }

  getMatch(group: Match): AngularFireObject<Match> {
    const path = `${this.basepath}/${group.$key}`;
    this.match = this.db.object(path);
    return this.match;
  }

  createMatch(group: Match): void {
    try {
      this.matches.push(group);
    } catch (e) {
      this.toastr.open(e);
    }
  }

  updateMatch(match: Match): void {
    this.matches.update(match.$key, <Match>{
      teamAId: match.teamAId,
      teamBId: match.teamBId,
      groupId: match.groupId,
      resultA: match.resultA,
      resultB: match.resultB,
      date: match.date
    })
      .catch(error => this.toastr.open(error));
  }

  deleteMatch(group: Match): void {
    this.matches.remove(group.$key)
      .catch(error => this.toastr.open(error));
  }

}

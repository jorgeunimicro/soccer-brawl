import { Component, OnInit } from '@angular/core';
import { Match, MatchesService } from './matches.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  displayedColumns = ['date', 'teamA', 'teamB', 'group', 'result', 'actions'];
  editingMatches = [];
  tempMatch = new Match();
  matches;

  constructor(public matchesService: MatchesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.matches = this.matchesService.getMatches()
      .snapshotChanges()
      .switchMap(list => {
        return Observable.of(list.map(item => {
          const match = item.payload.toJSON();
          match['$key'] = item.payload.key;
          return <Match>match;
        }));
      });
  }

  addMatch(match) {
    this.matchesService.createMatch(match);
  }

  editing(match) {
    return this.editingMatches.indexOf(match) >= 0;
  }

  editMatch(match) {
    this.editingMatches.push(match);
  }

  saveMatch(match) {
    this.matchesService.updateMatch(match);
    this.editingMatches = this.editingMatches.filter(item => item !== match);
  }

  deleteMatch(match) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, <MatDialogConfig>{
      data: {
        itemDescription: 'the match',
        title: 'Delete match'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.matchesService.deleteMatch(match);
      }
    });
  }
}

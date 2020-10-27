import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Score } from '../models/score.model';
import * as fromScoreboardReducer from '../store/scoreboard.reducer';

@Component({
  selector: 'app-scores-list',
  templateUrl: './scores-list.component.html',
  styleUrls: ['./scores-list.component.css']
})
export class ScoresListComponent implements OnInit, OnDestroy {
  scores: Score[];
  scoreSub: Subscription;
  sortType = 'asc';

  constructor(
    private store: Store<fromScoreboardReducer.AppState>, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.scoreSub = this.store.select('scoreboard').subscribe(state => {
      this.scores = state.scores;
    });
  }

  onEdit() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSort() {
    if (this.sortType == 'asc') {
      this.scores = this.scores.slice().sort((a, b) => a.score > b.score ? -1 : a.score > b.score ? 1 : 0);
      this.sortType = 'desc';
    }
    else {
      this.scores = this.scores.slice().sort((a, b) => a.score <= b.score ? -1 : a.score <= b.score ? 1 : 0);
      this.sortType = 'asc';
    }
  }

  ngOnDestroy() {
    this.scoreSub.unsubscribe();
  }

}

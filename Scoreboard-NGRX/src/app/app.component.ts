import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromScoreboardReducer from './store/scoreboard.reducer';
import * as ScoreboardActions from './store/scoreboard.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'scoreboard-ngrx-php';

  constructor(private store: Store<fromScoreboardReducer.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new ScoreboardActions.GetScores());
  }
}

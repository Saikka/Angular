import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';

import * as fromScoreboardReducer from '../store/scoreboard.reducer';
import * as ScoreboardActions from '../store/scoreboard.actions';
import { Score } from '../models/score.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-edit',
  templateUrl: './score-edit.component.html',
  styleUrls: ['./score-edit.component.css']
})
export class ScoreEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) form: NgForm;
  editMode = false; //tells where its creating of new item or update of existing one
  score: Score;
  index: number;
  routeSub: Subscription;

  constructor(
    private store: Store<fromScoreboardReducer.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.index = params['id'];
          this.store.select('scoreboard').subscribe(state => {
            this.score = state.scores.find(item => item.id === this.index);
            setTimeout(() => {
              this.form.setValue({
                name: this.score.name,
                score: this.score.score
              });
            }, 20);
          });
        }
      }
    )
  }

  onEdit(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      const newScore = new Score(value.name, value.score);
      newScore.id = this.index;
      this.store.dispatch(new ScoreboardActions.EditScore({index: this.index, score: newScore}));
    } else {
      this.store.dispatch(new ScoreboardActions.AddScoreStart({name: value.name, score: value.score}));
    }
    setTimeout(() => {
      this.form.reset();
      this.router.navigate(['/scores']);
    }, 30);
  }

  onCancel() {
    this.router.navigate(['/scores']);
  }

  onDelete() {
    this.form.reset();
    console.log(this.index);
    this.store.dispatch(new ScoreboardActions.DeleteScore(this.index));
    setTimeout(() => {
      this.router.navigate(['/scores']);
    }, 30);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}

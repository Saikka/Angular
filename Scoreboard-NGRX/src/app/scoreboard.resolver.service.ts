import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Score } from './models/score.model';
import * as fromScoreboardResolver from './store/scoreboard.reducer';
import * as ScoreboardActions from './store/scoreboard.actions';

@Injectable({providedIn: 'root'})
export class ScoreboardResolverService implements Resolve<Score[]> {
    constructor(private store: Store<fromScoreboardResolver.AppState>, private actions$: Actions) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('scoreboard').pipe(
            take(1),
            map(state => {
                return state.scores;
            }),
            switchMap(scores => {
                if (scores.length === 0) {
                    this.store.dispatch(new ScoreboardActions.GetScores());
                    return this.actions$.pipe(ofType(ScoreboardActions.SET_SCORES), take(1));
                } else {
                    return of(scores);
                }
            })
        )
    }
}
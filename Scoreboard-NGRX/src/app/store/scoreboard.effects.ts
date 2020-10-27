import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import * as ScoresboardActions from './scoreboard.actions';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Score } from '../models/score.model';

@Injectable()
export class ScoreboardEffects {

    @Effect()
    getScores = this.actions$.pipe(
        ofType(ScoresboardActions.GET_SCORES),
        switchMap(() => {
            return this.http.get<Score[]>('http://localhost/scoreboard/get.php')
        }),
        map(scores => {
            return new ScoresboardActions.SetScores(scores);
        })
    );

    @Effect()
    addScore = this.actions$.pipe(
        ofType(ScoresboardActions.ADD_SCORE_START),
        switchMap((actionData: ScoresboardActions.AddScoreStart) => {
            return this.http.post<Score>('http://localhost/scoreboard/add.php', {name: actionData.payload.name, score: actionData.payload.score})
        }),
        map(score => {
            console.log(score);
            return new ScoresboardActions.AddScoreSuccess(score);
        })
    );

    @Effect({dispatch:false})
    editScore = this.actions$.pipe(
        ofType(ScoresboardActions.EDIT_SCORE),
        switchMap((actionData: ScoresboardActions.EditScore) => {
            return this.http.put('http://localhost/scoreboard/update.php', actionData.payload.score)
        })
    );

    @Effect({dispatch:false})
    deleteScore = this.actions$.pipe(
        ofType(ScoresboardActions.DELETE_SCORE),
        switchMap((actionData: ScoresboardActions.DeleteScore) => {
            const params = new HttpParams().set('id', actionData.payload.toString());
            return this.http.delete('http://localhost/scoreboard/delete.php', {params: params})
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) {}

}
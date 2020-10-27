import { Action } from '@ngrx/store';
import { Score } from '../models/score.model';

export const GET_SCORES = 'Get Scores';
export const SET_SCORES = 'Set Scores';
export const ADD_SCORE_START = 'Add Score Start';
export const ADD_SCORE_SUCCESS = 'Add Score Success';
export const EDIT_SCORE = 'Edit Score';
export const DELETE_SCORE = 'Delete Score';

export class GetScores implements Action {
    readonly type = GET_SCORES;
}

export class SetScores implements Action {
    readonly type = SET_SCORES;

    constructor(public payload: Score[]) {}
}

export class AddScoreStart implements Action {
    readonly type = ADD_SCORE_START;

    constructor(public payload: {name: string, score: number}) {}
}

export class AddScoreSuccess implements Action {
    readonly type = ADD_SCORE_SUCCESS;

    constructor(public payload: Score) {}
}

export class EditScore implements Action {
    readonly type = EDIT_SCORE;

    constructor(public payload: {index: number, score: Score}) {}
}

export class DeleteScore implements Action {
    readonly type = DELETE_SCORE;

    constructor(public payload: number) {}
}

export type ScoresActions = 
| GetScores 
| SetScores 
| AddScoreStart 
| AddScoreSuccess 
| EditScore
| DeleteScore;
import { Score } from '../models/score.model';

import * as ScoreboardActions from './scoreboard.actions';

export interface AppState {
    scoreboard: State
}

export interface State {
    scores: Score[]
}

const initialState: State = {
    scores: []
}

export function scoreboardReducer(state = initialState, action: ScoreboardActions.ScoresActions) {
    switch(action.type) {
        case ScoreboardActions.SET_SCORES:
            return {
                ...state,
                scores: [...action.payload]
            }
        case ScoreboardActions.ADD_SCORE_SUCCESS:
            return {
                ...state,
                scores: [...state.scores, action.payload]
            }
        case ScoreboardActions.EDIT_SCORE:
            var id = -1;
            state.scores.find((item, index) => {
                if (item.id === action.payload.index) {
                    id = index;
                }
            });
            const updatedScore = { 
                ...state.scores[id],
                ...action.payload.score
            };
            const updatedScores = [...state.scores];
            updatedScores[id] = updatedScore;
            return {
                ...state,
                scores: updatedScores
            };
        case ScoreboardActions.DELETE_SCORE:
            return {
                ...state,
                scores: state.scores.filter(score => {
                    return score.id !== action.payload;
                })
            }
        default:
            return state;
    }
}
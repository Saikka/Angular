import { Injectable } from "@angular/core";
import { Score } from './score.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScoreboardService {
    scores: Score[] = [];
    //get updated everytime list of scores is changed
    scoresChanged = new Subject<Score[]>();

    constructor(private http: HttpClient) {}

    setScores(scores: Score[]) {
        this.scores = scores;
        this.scoresChanged.next(this.scores);
    }

    //saves scores to db, because firebase it used every time all scores have to be rewritten
    storeScores() {
        this.http.put(
            'https://scoreboard-8a4ac.firebaseio.com//scores.json', 
            this.scores)
            .subscribe(response => {
                console.log(response);
        });
        this.scoresChanged.next(this.scores);
    }

    //gets scores from db
    fetchScores() {
        return this.http
            .get<Score[]>(
                'https://scoreboard-8a4ac.firebaseio.com//scores.json'
            ).pipe(
                tap(scores => {
                    this.setScores(scores);
                })
            );
    }

    //adds new score
    addScore(score: Score) {
        this.scores.push(score);
        this.storeScores();
    }

    //updates existing score based on id
    updateScore(index: number, score: Score) {
        this.scores[index] = score;
        this.storeScores();
    }

    //deletes score based on id
    deleteScore(index: number) {
        this.scores.splice(index, 1);
        this.storeScores();
    }

}
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Score } from './score.model';
import { ScoreboardService } from './scoreboard.service';

@Injectable({providedIn: 'root'})
export class ScoreboardResolverService implements Resolve<Score[]> {
    constructor(private scoreboardService: ScoreboardService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const scores = this.scoreboardService.scores;

        if (scores.length === 0) {
            return this.scoreboardService.fetchScores();
        } else {
            return scores;
        }
    }
}
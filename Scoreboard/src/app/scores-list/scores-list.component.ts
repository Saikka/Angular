import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScoreboardService } from '../scoreboard.service';
import { Score } from '../score.model';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scores-list',
  templateUrl: './scores-list.component.html',
  styleUrls: ['./scores-list.component.css']
})
export class ScoresListComponent implements OnInit, OnDestroy {
  scores: Score[];
  scoreSub: Subscription;
  sortType = 'asc';

  constructor(private scoreboardService: ScoreboardService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    //onces on create fetchs scores from db
    this.scoreboardService.fetchScores().pipe(take(1)).subscribe();
    //keeps a track on whenever scores are changed
    this.scoreSub = this.scoreboardService.scoresChanged.subscribe(scores => {
      this.scores = scores;
      console.log(scores);
    });
  }

  onEdit() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSort() {
    if (this.sortType == 'asc') {
      this.scores = this.scores.sort((a, b) => a.score < b.score ? -1 : a.score > b.score ? 1 : 0);
      this.sortType = 'desc';
    }
    else {
      this.scores = this.scores.sort((a, b) => a.score > b.score ? -1 : a.score > b.score ? 1 : 0);
      this.sortType = 'asc';
    }
  }

  ngOnDestroy() {
    this.scoreSub.unsubscribe();
  }

}

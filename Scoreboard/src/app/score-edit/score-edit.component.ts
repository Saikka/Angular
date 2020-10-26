import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScoreboardService } from '../scoreboard.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-edit',
  templateUrl: './score-edit.component.html',
  styleUrls: ['./score-edit.component.css']
})
export class ScoreEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) form: NgForm; //for accessing form
  editMode = false; //tells where its creating of new item or update of existing one
  index: number;
  routeSub: Subscription;

  constructor(private scoreboardService: ScoreboardService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.index = +params['id'];
          const score = this.scoreboardService.scores[this.index];
          setTimeout(() => {
            this.form.setValue({
              name: score.name,
              score: score.score
            });
          }, 10);
        }
      }
    )
  }

  onEdit(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      this.scoreboardService.updateScore(this.index, {name: value.name, score: value.score});
    } else {
      this.scoreboardService.addScore({name: value.name, score: value.score});
    }
    this.router.navigate(['/scores']);
  }

  onCancel() {
    this.router.navigate(['/scores']);
  }

  onDelete() {
    this.scoreboardService.deleteScore(this.index);
    this.router.navigate(['/scores']);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}

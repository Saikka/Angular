import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { scoreboardReducer } from './store/scoreboard.reducer';
import { ScoreboardEffects } from './store/scoreboard.effects';
import { ScoresListComponent } from './scores-list/scores-list.component';
import { ScoreEditComponent } from './score-edit/score-edit.component';
import { HeaderComponent } from './header/header.component';
import { ScoreboardResolverService } from './scoreboard.resolver.service';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/scores' },
  { path: 'scores', component: ScoresListComponent,
    resolve: [ScoreboardResolverService],
    children: [
      { path: 'new', component: ScoreEditComponent},
      { path: ':id/edit', component: ScoreEditComponent}
    ]},
]

@NgModule({
  declarations: [
    AppComponent,
    ScoresListComponent,
    ScoreEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({scoreboard: scoreboardReducer}),
    EffectsModule.forRoot([ScoreboardEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

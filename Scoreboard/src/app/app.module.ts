import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ScoreEditComponent } from './score-edit/score-edit.component';
import { ScoresListComponent } from './scores-list/scores-list.component';
import { ScoreboardResolverService } from './scores-resolver.service';
import { HeaderComponent } from './header/header.component';

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
    ScoreEditComponent,
    ScoresListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

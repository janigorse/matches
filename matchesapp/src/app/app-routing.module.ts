import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchListComponent } from "./matches/match-list/match-list.component";
import { MatchEditComponent } from "./matches/match-edit/match-edit.component";

const routes: Routes = [
  { path: '', redirectTo: '/matches',  pathMatch: 'full'},
  { path: 'matches', component: MatchListComponent},
  { path: 'match/:id', component: MatchEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

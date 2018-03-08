import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MatchService } from './shared/match.service';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchEditComponent } from './match-edit/match-edit.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  providers: [MatchService],
  declarations: [MatchListComponent, MatchEditComponent],
  exports: [MatchListComponent, MatchEditComponent]
})
export class MatchesModule { }

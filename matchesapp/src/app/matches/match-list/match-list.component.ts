import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatchService } from '../shared/match.service';
import { Match } from '../shared/match';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  matches: Match[];

  constructor(private matchService: MatchService, private router: Router) { }

  ngOnInit() {
    this.getMatches();
    //this.getMatchesFeed();
  }

  getMatchesFeed(): void {
    this.matchService.getMatchesFeed();
  }

  getMatches(): void {
    this.matchService.getMatches()
      .subscribe(matches => this.matches = matches);
  }

  editMatch = function(id) {
    this.router.navigate(['/match/id', { Id: id}]);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MatchService } from '../shared/match.service';
import { Match } from '../shared/match';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {
  match: Match;

  constructor(
    private route: ActivatedRoute, 
    private matchService: MatchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMatch();
  }

  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get('Id');
    this.matchService.getMatch(id)
    .subscribe(match => {
      this.match = match;
    }); 
  }

  save(): void {
    this.matchService.updateMatch(this.match);
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['/matches']);
  }

}

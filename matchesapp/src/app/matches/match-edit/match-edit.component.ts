import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

import { MatchService } from "../shared/match.service";
import { Match } from "../shared/match";

@Component({
  selector: "app-match-edit",
  templateUrl: "./match-edit.component.html",
  styleUrls: ["./match-edit.component.css"]
})
export class MatchEditComponent implements OnInit {
  match: Match;

  constructor(
    private route: ActivatedRoute,
    private matchService: MatchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMatch();
  }

  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get("Id");
    this.matchService.getMatch(id).subscribe(matchFromService => {
      this.match = this.constructNewMatch(matchFromService);
    });
  }

  save(): void {
    this.matchService.updateMatch(this.match);
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(["/matches"]);
  }

  constructNewMatch(match: Match): Match {
    let newMatch = new Match();
    newMatch.Id = match.Id;
    newMatch.MatchPeriod = match.MatchPeriod;
    newMatch.TeamHome = match.TeamHome;
    newMatch.TeamAway = match.TeamAway;
    newMatch.SportName = match.SportName;
    newMatch.CategoryName = match.CategoryName;
    newMatch.TournamentName = match.TournamentName;
    newMatch.MatchResultHome = match.MatchResultHome;
    newMatch.MatchResultAway = match.MatchResultAway;
    newMatch.Periods = match.Periods;
    return newMatch;
  }
}

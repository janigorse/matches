import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

import { MatchService } from "../shared/match.service";
import { Match } from "../shared/match";
import { Period } from "../shared/period";
import { MATCHES } from "../shared/mock-matches";

@Component({
  selector: "app-match-list",
  templateUrl: "./match-list.component.html",
  styleUrls: ["./match-list.component.css"]
})
export class MatchListComponent implements OnInit {
  matches: Match[];

  constructor(private matchService: MatchService, private router: Router) {}

  ngOnInit() {
    //this.getMockedMatches();
    this.getMatchesFeed();
  }

  getMatchesFeed(): void {
    /*
    this.matchService.getMatches().subscribe(feedResult => {
      console.log(feedResult.filter(match => match.Id === 3));
    });
    */
    this.matches = [];
    this.matchService.getMatchesFeed().subscribe(feedResult => {
      let feedData = feedResult.doc[0].data;
      let sport = feedData.filter(soccer => soccer.name === "Soccer")[0];
      let categories = sport.realcategories;
      categories.forEach(category => {
        let categoryName = category.name;
        let tournaments = category.tournaments;
        tournaments.forEach(tournament => {
          let tournamentName = tournament.name;
          tournament.matches
            .filter(match => match.status._id === 100)
            .map(match => {
              let newMatch = new Match();
              newMatch.Id = match._id;
              newMatch.MatchPeriod = match._dt.date + " " + match._dt.time;
              newMatch.TeamHome = match.teams.home.name;
              newMatch.TeamAway = match.teams.away.name;
              newMatch.SportName = sport.name;
              newMatch.CategoryName = categoryName;
              newMatch.TournamentName = tournamentName;
              newMatch.MatchResultHome = match.result.home;
              newMatch.MatchResultAway = match.result.away;
              newMatch.Periods = [];
              for (let [key, val] of Object.entries(match.periods)) {
                if (key != "ft") {
                  let newPeriod = new Period();
                  newPeriod.PeriodHome = val.home;
                  newPeriod.PeriodAway = val.away;
                  newMatch.Periods.push(newPeriod);
                }
              }

              this.matches.push(newMatch);
            });
        });
      });
      MATCHES = this.matches;
    });
  }

  getMockedMatches(): void {
    this.matchService.getMatches().subscribe(matches => {
      this.matches = matches;
      console.log(this.matches);
    });
  }

  editMatch = function(id) {
    this.router.navigate(["/match/id", { Id: id }]);
  };
}

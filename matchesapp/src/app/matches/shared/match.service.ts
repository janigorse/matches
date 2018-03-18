import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { HttpClient } from "@angular/common/http";

import { Match } from "./match";
import { Period } from "./period";
import { MATCHES } from "./mock-matches";

@Injectable()
export class MatchService {
  constructor(private http: HttpClient) {}

  //configUrl: string = "https://ls.betradar.com/ls/feeds/?/bet3000/en/Europe:Berlin/gismo/event_fullfeed/-1";
  configUrl = "assets/feed.json";

  getMatchesFeed(): Observable<Match[]> {
    if (MATCHES.length > 0) {
      return this.getMatches();
    }

    this.http.get(this.configUrl).subscribe(feedResult => {
      let feedData = feedResult.doc[0].data;
      let sport = feedData.filter(soccer => soccer.name === "Soccer")[0];
      let categories = sport.realcategories;
      categories.forEach(category => {
        let categoryName = category.name;
        let tournaments = category.tournaments;
        tournaments.forEach(tournament => {
          let tournamentName = tournament.name;
          let matches = tournament.matches;
          //tournament.matches
          matches.filter(match => match.status._id === 100).map(match => {
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
            MATCHES.push(newMatch);
          });
        });
      });
    });

    return of(MATCHES);
  }

  getMatches(): Observable<Match[]> {
    return of(MATCHES);
  }

  getMatch(id: number): Observable<Match> {
    return of(MATCHES.find(match => match.Id == id));
  }

  updateMatch(match: Match): void {
    let foundMatch = MATCHES.find(foundedMatch => foundedMatch.Id == match.Id);
    let foundMatchIndex = MATCHES.indexOf(foundMatch);
    MATCHES[foundMatchIndex] = match;
  }
}

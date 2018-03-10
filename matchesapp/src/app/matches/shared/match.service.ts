import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

import { Match } from './match';
import { MATCHES} from './mock-matches';

@Injectable()
export class MatchService {

  constructor(private http: HttpClient) { }

  configUrl: string = 'https://ls.betradar.com/ls/feeds/?/bet3000/en/Europe:Berlin/gismo/event_fullfeed/-1';

  getMatchesFeed() {
    let apiURL = `${this.configUrl}?callback=JSONP_CALLBACK`; 
    return this.http.jsonp(apiURL, 'callback');
    //return this.http.get(this.configUrl);
  }
  
  getMatches(): Observable<Match[]> {
    return of(MATCHES);
  }

  getMatch(id: number): Observable<Match> {
    return of(MATCHES.find(match => match.Id == id));
  }

  updateMatch(match: Match): Match {
    //return of(MATCHES.find(match => match.Id == match.Id));
    let foundMatch = MATCHES.find(foundedMatch => foundedMatch.Id == match.Id);
    foundMatch = match;
    return foundMatch;
  }

}

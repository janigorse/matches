import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Match } from './match';
import { MATCHES} from './mock-matches';

@Injectable()
export class MatchService {

  constructor() { }

  getMatches(): Observable<Match[]> {
    return of(MATCHES);
  }

  getMatch(id: number): Observable<Match> {
    return of(MATCHES.find(match => match.Id == id));
  }

}

import { Period } from './period';

export class Match {
    Id: number;
    MatchPeriod: string;
    TeamHome: string;
    TeamAway: string;
    SportName: string;
    CategoryName: string;
    TournamentName: string;
    MatchResultHome: number;
    MatchResultAway: number;
    Periods: Period[];
}
import { Period } from "./period";

export class Match {
  public Id: number;
  public MatchPeriod: string;
  public TeamHome: string;
  public TeamAway: string;
  public SportName: string;
  public CategoryName: string;
  public TournamentName: string;
  public MatchResultHome: number;
  public MatchResultAway: number;
  public Periods: Period[];
}

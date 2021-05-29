import { Observable } from 'rxjs';
export abstract class MatchData {
    abstract getMatchData(summonerName: string, server: string, refresh?: boolean): Observable<any>;
}

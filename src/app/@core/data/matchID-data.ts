import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { MatchReferenceDto } from '../models/match-models/match';
import { MatchDTO } from '../models/match-models/matchListDto';

export abstract class MatchIDData {
    abstract getMatchData(summonerName: string, server: string, refresh?: boolean): Observable<ApiResult<MatchReferenceDto[]>>;
}

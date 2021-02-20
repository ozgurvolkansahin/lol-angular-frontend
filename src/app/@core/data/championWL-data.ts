import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { ChampionMasteriesModel } from '../models/champion-masteries-models/champion-masteries';
import { MatchReferenceDto } from '../models/match-models/match';

export abstract class ChampionWLData {
    abstract getWL(summonerName: string, server: string): Observable<ApiResult<any>>;
}
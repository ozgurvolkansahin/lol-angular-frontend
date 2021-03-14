import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { ChampionMasteriesModel } from '../models/champion-masteries-models/champion-masteries';
import { MatchReferenceDto } from '../models/match-models/match';
import { MultipleSummoner } from '../models/match-models/multiple-summoner';

export abstract class ChampionWLData {
    abstract getWL(summonerName: string, server: string, refresh?: boolean): Observable<ApiResult<any>>;
    abstract getMultipleSummoners(summonerList: string[], server: string): Observable<ApiResult<MultipleSummoner[]>>;

}

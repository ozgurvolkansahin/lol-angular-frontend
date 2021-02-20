import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { ChampionMasteriesModel } from '../models/champion-masteries-models/champion-masteries';

export abstract class ChampionMasteryData {
    abstract getChampionMasteries(summonerName: string, server: string): Observable<ApiResult<ChampionMasteriesModel>>;
}

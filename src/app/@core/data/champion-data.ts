import { Observable } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { FreeChampions } from '../models/champion-models/free-champs';
import { CurrentGameInfo } from '../models/spectator/spectator-model';

export abstract class ChampionData {
    abstract getFreeChampions(): Observable<ApiResult<FreeChampions>>;
}

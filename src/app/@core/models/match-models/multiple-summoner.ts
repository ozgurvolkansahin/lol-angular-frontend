import { Entry } from "../entry-models/entry";
import { MatchReferenceDto } from "./match";

export interface MultipleSummoner {
    summonerName: string;
    entries: Entry[];
    details: MatchReferenceDto[][];
}
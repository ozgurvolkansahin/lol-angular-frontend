export interface ChampionMasteriesModel {
    championMasteries: ChampionMasteries[];
    date: string;
}

export interface ChampionMasteries {
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    championId: number;
    championName: string;
    lastPlayTime: number;
    championLevel: number;
    summonerId: string;
    championPoints: number;
    championPointsSinceLastLevel: number;
    tokensEarned: number;
}
export class CurrentGameInfo {
    public gameId: number;
    public gameType: string;
    public gameStartTime: number;
    public mapId: number;
    public gameLength: number;
    public platformId: string;
    public gameMode: string;
    public bannedChampions: BannedChampion[];
    public gameQueueConfigId: number;
    public observer: Observer;
    public participants: CurrentGameParticipant[];
}
export class Perks {
    public perkIds: number[];
    public perkStyle: number;
    public perkSubStyle: number;
}

export class GameCustomizationObject {
    public category: string;
    public content: string;
}

export class Observer {
    public encryptionKey: string;
}

export class BannedChampion {
    public pickTurn: number;
    public championId: number;
    public teamId: number;
}

export class CurrentGameParticipant {
    public championId: number;
    public perks: Perks;
    public profileIconId: number;
    public bot: boolean;
    public teamId: number;
    public summonerName: string;
    public summonerId: string;
    public spell1Id: number;
    public spell2Id: number;
    public gameCustomizationObjects: GameCustomizationObject[];
}

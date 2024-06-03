export interface IQueueSkill {
    TotalGamesNeededForRating: number;
    TotalGamesNeededForLeaderboard: number;
    CurrentSeasonGamesNeededForRating: number;
    SeasonalInfoBySeasonID: {
        [x: string]: ISeasonalInfo;
    };
}

export interface ISeasonalInfo {
    SeasonID: string;
    NumberOfWins: number;
    NumberOfWinsWithPlacements: number;
    NumberOfGames: number;
    Rank: number;
    CapstoneWins: number;
    LeaderboardRank: number;
    CompetitiveTier: number;
    RankedRating: number;
    WinsByTier: {
        [x: string]: number;
    } | null;
    GamesNeededForRating: number;
    TotalWinsNeededForRank: number;
}

export interface ILatestCompetitiveUpdate {
    MatchID: string;
    MapID: string;
    SeasonID: string;
    MatchStartTime: number;
    TierAfterUpdate: number;
    TierBeforeUpdate: number;
    RankedRatingAfterUpdate: number;
    RankedRatingBeforeUpdate: number;
    RankedRatingEarned: number;
    RankedRatingPerformanceBonus: number;
    CompetitiveMovement: 'MOVEMENT_UNKNOWN';
    AFKPenalty: number;
}

export interface IPlayerMMRResponse {
    Version: number;
    Subject: string;
    NewPlayerExperienceFinished: boolean;
    QueueSkills: {
        [x: string]: IQueueSkill;
    };
    LatestCompetitiveUpdate: ILatestCompetitiveUpdate;
    IsLeaderboardAnonymized: boolean;
    IsActRankBadgeHidden: boolean;
    OnboardingStatus: string;
}

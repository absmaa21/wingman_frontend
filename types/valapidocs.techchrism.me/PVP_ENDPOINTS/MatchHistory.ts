export interface IMatch {
    MatchID: string;
    GameStartTime: number;
    QueueID: string;
};

export interface IMatchHistoryResponse {
    Subject: string;
    BeginIndex: number;
    EndIndex: number;
    Total: number;
    History: IMatch[];
};

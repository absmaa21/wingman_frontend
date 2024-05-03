export interface EventsResponse {
    status: number;
    data:   IEvent[];
}

export interface IEvent {
    uuid:             string;
    displayName:      string;
    shortDisplayName: string;
    startTime:        Date;
    endTime:          Date;
    assetPath:        string;
}

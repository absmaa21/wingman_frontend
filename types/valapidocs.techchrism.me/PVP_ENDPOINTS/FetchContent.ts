export interface IFetchContentSeason {
  ID: string;
  Name: string;
  Type: 'episode' | 'act';
  /** Date in ISO 8601 format */
  StartTime: string;
  /** Date in ISO 8601 format */
  EndTime: string;
  IsActive: boolean;
}

export interface IFetchContentEvent {
  ID: string;
  Name: string;
  /** Date in ISO 8601 format */
  StartTime: string;
  /** Date in ISO 8601 format */
  EndTime: string;
  IsActive: boolean;
}

export interface IFetchContentResponse {
  DisabledIDs: unknown[];
  Seasons: IFetchContentSeason[];
  Events: IFetchContentEvent[];
}

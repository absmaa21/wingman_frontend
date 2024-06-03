import {IPlayerLoadoutResponse} from "./PlayerLoadout";

export type SetPlayerLoadoutResponse = IPlayerLoadoutResponse;
export type SetPlayerLoadoutBody = Omit<IPlayerLoadoutResponse, 'Subject' | 'Version'>;

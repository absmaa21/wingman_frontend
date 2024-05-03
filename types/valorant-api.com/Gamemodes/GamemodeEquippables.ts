export interface GamemodeEquippablesResponse {
    status: number;
    data:   IGamemodeEquippable[];
}

export interface IGamemodeEquippable {
    uuid:           string;
    displayName:    string;
    category:       string;
    displayIcon:    string;
    killStreamIcon: string;
    assetPath:      string;
}

export interface IVersionResponse {
    status: number;
    data:   IVersion;
}

export interface IVersion {
    manifestId:        string;
    branch:            string;
    version:           string;
    buildVersion:      string;
    engineVersion:     string;
    riotClientVersion: string;
    riotClientBuild:   string;
    buildDate:         Date;
}

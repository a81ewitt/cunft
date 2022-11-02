export interface Health {
    status:     string;
    components: Components;
}

export interface Components {
    cardanoWalletAPI: CardanoWalletAPI;
    diskSpace:        DiskSpace;
    mongo:            Mongo;
    ping:             Ping;
}

export interface CardanoWalletAPI {
    status:  string;
    details: CardanoWalletAPIDetails;
}

export interface CardanoWalletAPIDetails {
    ready: string;
}

export interface DiskSpace {
    status:  string;
    details: DiskSpaceDetails;
}

export interface DiskSpaceDetails {
    total:     number;
    free:      number;
    threshold: number;
    exists:    boolean;
}

export interface Mongo {
    status:  string;
    details: MongoDetails;
}

export interface MongoDetails {
    version: string;
}

export interface Ping {
    status: string;
}
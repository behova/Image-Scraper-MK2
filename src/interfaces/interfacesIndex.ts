export interface DB_Image {
    thumbURL: string;
    fullURL: string;
    name: string;
    source: string;
    pallet: string;
}

export interface ProcessEnv {
    DATABASE_URL: string;
    IMAGES_PATH: string;
}

export enum Source {
    REDDIT = 1,
    FOURCHAN,
}

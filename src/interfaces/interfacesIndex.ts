import { cleanEnv, str, num } from 'envalid';

export const env = cleanEnv(process.env, {
    DATABASE_URL: str(),
    NODE_ENV: str({
        choices: ['development', 'production'],
    }),
    IMAGES_PATH: str(),

    SCRAPER_SCHEDULE: str(),
    CULL_SCHEDULE: str(),
    DELAY_MIN: num(),
    DELAY_MAX: num(),
    SIZE_TO_CULL: num(),
});

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

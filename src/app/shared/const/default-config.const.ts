import { Config } from "../models/config.type";

export const DEFAULT_CONFIG: Config = {
    minutesToExpiry: 25,
    baseUrl: 'https://clipclutch.app',
    apiPath: '/api/v1',
    apiDownloadPath: '/download',
    apiEmailPath: '/email'
};
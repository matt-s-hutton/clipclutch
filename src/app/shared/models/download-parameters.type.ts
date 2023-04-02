export type DownloadParameters = {
    url: string,
    options: DownloadOptions
}

export type DownloadOptions = {
    convertFormat: string,
    embedSubs: boolean,
    getThumbnail: boolean
}
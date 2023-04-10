export type DownloadResponse = {
    status: number,
    message: DownloadDetails
}

export type DownloadDetails = {
    path: string,
    format: string,
    media: string
    thumbnail: string | null
}
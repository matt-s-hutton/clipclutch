export type DownloadResponse = {
    status: number,
    message: DownloadPath
}

type DownloadPath = {
    path: string
}
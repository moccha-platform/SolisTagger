export interface settingsParams {
    search: {
        filter: number,
        reduceFilter: boolean
    }
    tagger: {
        renameFile: boolean
        buildLibrary: boolean
        excludeMeta: []
    }
    language: {
        selected: string,
        auto: boolean
    }
    cache: {
        enabled: boolean
        content?: {
            artist: []
            albums: []
            tracks: []
        }
    },
    appearance: {
      mode: 'light' | 'dark' | 'deep-dark'
      auto: boolean
      primary: string
    }
    updates: {
        autoUpdate: boolean
    }
}
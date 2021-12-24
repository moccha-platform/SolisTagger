export interface appVersions {
    
    app: {
        version: string,
        buildDate: string
    }
    system: {
        arch: string
        platform: string
    }

}

export interface updateInfo {

    pending: boolean
    current: string
    remote: string
    higher: boolean
    changelog?: string
    developerInfo?: string
    error?: boolean

}
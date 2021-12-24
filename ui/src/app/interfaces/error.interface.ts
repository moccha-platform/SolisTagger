interface error {
    error: string
}

interface networkError extends error {

    error: 'NOT_CONNECTED' | 'API_ERROR'
    httpStatus: number

}

interface analysisError extends error {

    error: 'ANALYSIS_ERROR'

}
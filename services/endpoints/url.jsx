const BASE_URL = 'http://localhost:3000'

export const THERAPIST_URL = `${BASE_URL}/api/therapist`
export const THERAPIST_URL_ID = (id) => {
    return `${BASE_URL}/api/therapist/${id}`
}
export const THERAPIST_LOGIN_URL = `${BASE_URL}/api/therapist/login`

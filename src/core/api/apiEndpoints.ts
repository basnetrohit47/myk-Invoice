export const API_ENDPOINTS = {
    INVOICE: {
        GET_LIST: (page: number, page_size: number) => `/invoice?page=${page}&page_size=${page_size}`,
        GET_STAT: `/invoice_stats`,
        GET_BY_ID: (id: number) => `/invoice/${id}`,
        CREATE: `/invoice`,
        UPDATE: (id: number) => `/invoice/${id}`,
        DELETE: (id: number) => `/invoice/${id}`
    },
    PROFILE: {
        LOGIN: `/login`,
        GET_PROFILE: `/profile`,
        EDIT_PROFILE: `/profile`,
        REGISTER: `/register`
    }

}

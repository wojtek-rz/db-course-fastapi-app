import axios from "axios"

// const base_url = "http://0.0.0.0:8000/api"
const base_url = "https://recipe-app-backend-jutkuzvhoq-lm.a.run.app/api"


function configureConfig(prev_config = {}) {
    let config = {
        ...prev_config,
        paramsSerializer: { // so the array params will serialize using repeated argument version
            indexes: null // by default: false
        }
    };
    const token = window.localStorage.getItem('token')
    if (token) {
        config = {
            ...config,
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }
    }
    console.log(config)
    return config
}

export function useGetRequest(url, config = {}) {
    return axios.get(base_url + url, configureConfig(config)).then(res => res.data)
        .catch(err => {
            // if return code is 401 then remove token from local storage
            if (err.response.status === 401) {
                window.localStorage.removeItem('token')
            }
            throw err
        })
}

export function usePostRequest(url, data) {
    return axios.post(base_url + url, data, configureConfig()).then(res => res.data)
}

export function useDeleteRequest(url) {
    return axios.delete(base_url + url, configureConfig()).then(res => res.data)
}
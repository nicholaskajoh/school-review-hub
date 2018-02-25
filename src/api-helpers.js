import axios from 'axios';


class APIHelper {
    constructor(){
        this.token = localStorage.getItem("authToken");
        this.api_base_url = process.env.REACT_APP_API_DOMAIN_NAME + '/api/';
    }

    get(url, use_header=false){
        if (use_header)
        {
            return axios.get(`${this.api_base_url}${url}`,
                { headers: { Authorization: `Token ${this.token}` } }
            );
        }
        return axios.get(`${this.api_base_url}${url}`);
    }

    post(url, data, use_header=false){
        if (use_header)
        {
            return axios.post(`${this.api_base_url}${url}`, data,
                { headers: { Authorization: `Token ${this.token}` } }
            );
        }
        return axios.post(`${this.api_base_url}${url}`, data);
    }

    delete(url, use_header=false){
        if (use_header)
        {
            return axios.delete(`${this.api_base_url}${url}`,
                { headers: { Authorization: `Token ${this.token}` } }
            );
        }
        return axios.delete(`${this.api_base_url}${url}`);
    }
}

export function getAuth(){
    return localStorage.getItem("authToken") !== null || localStorage.getItem("authToken") === "";
}

export default APIHelper;
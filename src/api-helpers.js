import axios from 'axios';


class APIHelper {
    constructor(){
        this.token = localStorage.getItem('authToken');
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
    return localStorage.getItem('authToken') !== null || localStorage.getItem('authToken') === '';
}


export function errors_to_array(e){
    if (e.response)
    {
        if (e.response.status === 500){
            console.log('ERROR 500: Server ran into a problem');
            return ['We ran into an error, we\'ll notify the development team right away'];
        }
        else if (e.response.status === 404)
        {
            console.log('ERROR 404: Page not found');
            return ['Something is wrong, please refresh the page'];
        }
        else if (e.response.status === 401)
        {
            console.log('ERROR 401: Unauthorized');
            localStorage.removeItem('authToken');
            window.location.replace('/login');
        }
        else
        {
            let msg = [];
            console.log('ERROR 400: error in response');

            Object.keys(e.response.data).forEach(function(key) {
                for (var i = 0; i < e.response.data[key].length; i++)
                {
                    // if (key !== '__all__' && key !== 'non_field_errors')
                    // {
                    //     msg.push(`${key}: ${e.response.data[key][i]}`);
                    // }
                    // else
                    // {
                        msg.push(`${e.response.data[key][i]}`);
                    // }
                }
            });
            return msg;
        }
    }
    else
    {
        console.log('ERROR 0: Server is down or there is no internet connection');
        return ['Unable to connect, try again'];
    }
}

export default APIHelper;
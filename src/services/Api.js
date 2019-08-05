import axios from 'axios'
import store from '../store'

export default() => {
    //var serverUrl = "http://localhost/flood-monitoring/";
    
    return axios.create({
        "baseURL": store.getters.serverUrl,
        //"baseURL": serverUrl,
        headers: {
            'Content-Type': 'text/plain',
        }
    });
}
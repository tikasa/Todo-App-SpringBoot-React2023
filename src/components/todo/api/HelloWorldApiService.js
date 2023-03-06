import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);

export const retrieveHelloWorldPara = (username) => apiClient.get(`/hello-world/path-variable/${username}`)

export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean')
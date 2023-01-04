import axios from "axios";
import {
    getItem,
    KEY_ACCESS_TOKEN,
    removeItem,
    setItem,
} from "./localStorageManager";

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
    const accessToken = getItem(KEY_ACCESS_TOKEN);
    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
});

axiosClient.interceptors.response.use(async (respone) => {
    const data = respone.data;
    if (data.status === "ok") {
        return data;
    }

    const originalRequest = respone.config;
    const statusCode = data.statusCode;
    const error = data.error;

    if (
        // when refresh token expires, send user to login page
        statusCode === 401 &&
        originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
    ) {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(error);
    }

    if (statusCode === 401 && !originalRequest._retry) { // means the access token has expired
        originalRequest._retry = true;
        const response = await axiosClient.get("/auth/refresh");

        if (response.status === "ok") {
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            originalRequest.headers[
                "Authorization"
            ] = `Bearer ${response.result.accessToken}`;

            return axios(originalRequest);
        }
    }

    return Promise.reject(error);
});

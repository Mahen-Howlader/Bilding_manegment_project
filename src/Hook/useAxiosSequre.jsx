import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export const axiosSequre = axios.create({
    baseURL: "http://localhost:8000",
})

function useAxiosSequre() {

    const navigator = useNavigate()
    const { logOut } = useAuth()
    axiosSequre.interceptors.request.use(function (config) {
        const token = localStorage.getItem("access_token");
        console.log("stop by interceptor", token)
        config.headers.authorization = `Token ${token}`
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axiosSequre.interceptors.response.use(
        function (response) {
            return response;
        },
        async function (error) {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                await logOut();
                navigator("/login");
            }
            return Promise.reject(error);
        }
    );


    return axiosSequre;
}

export default useAxiosSequre;
import axios from "axios";

export const axiosSequre = axios.create({
    baseURL: "http://localhost:8000",
})

function useAxiosSequre() {
    return axiosSequre;
}

export default useAxiosSequre;
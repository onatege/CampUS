import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/config";

const fetchData = (endpoint, token) => {

    return axios.get(`${baseUrl}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token ? token : ""}`
        }
    })
}

export const useGenericQueryHook = (endpoint, key) => {
    const {token} = useSelector(state => state.token)

    return useQuery({
        queryKey: [`${key}`],
        queryFn: () => fetchData(endpoint, token),
        enabled: true,

    })
}
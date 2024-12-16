import { useQuery } from "@tanstack/react-query";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { userActions } from "../utils/slices/user-slice";
import { baseUrl } from "../utils/config";


const fetchData = async (userId, dispatch) => {
    const res = await axios.get(`${baseUrl}/api/User/GetUserWithFollowersAndPostsById?id=${userId}`)
    dispatch(userActions.replaceUser(res?.data?.data))
    return res;
}

export const useGetUserInfosAndSendRedux = (userId) => {
    const dispatch = useDispatch();
    return useQuery({
        queryKey: [`user`],
        queryFn: () => fetchData(userId, dispatch),
        enabled: true,
    })
}
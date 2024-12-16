import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { baseUrl } from "../utils/config";

const addData = async (data) => {
  console.log(data.endpoint, data.data)
  return await axios.post(`${baseUrl}${data.endpoint}`, data.data, {
    headers: {
      'Authorization': `Bearer ${data?.token ? data?.token : ""}`
    }
  }).catch(error => {
    console.log('Error:', error.response.data.Data);
    ToastAndroid.show(`${error.response.data.Data}`, ToastAndroid.SHORT);
    
  });
}

const putData = async (data) => {
  console.log(data.endpoint, data.data)
  return await axios.put(`${baseUrl}${data.endpoint}`, data.data, {
    headers: {
      'Authorization': `Bearer ${data?.token ? data?.token : ""}`
    }
  }).catch(error => {
    console.log('Error:', error.response.data.Data);
    ToastAndroid.show(`${error.response.data.Data}`, ToastAndroid.SHORT);

  });
}

const delData = async (data) => {
  console.log(data.endpoint, data.data)
  return await axios.delete(`${baseUrl}${data.endpoint}`, {
    headers: {
      'Authorization': `Bearer ${data?.token ? data?.token : ""}`
    },
    data: data?.data ? data.data : null
  }).catch(error => {
    console.log('Error:', error.response.data.Data);
    ToastAndroid.show(`${error.response.data.Data}`, ToastAndroid.SHORT);

  });
}

export const useAddMutate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: addData,
      onSuccess: (data, variables) => Promise.all([
        variables.key.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] });
        })
      ])
    }
  )
}

export const useUpdateMutate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: putData,
      onSuccess: (data, variables) => Promise.all([
        variables.key.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] });
        })
      ])
    }
  )
}

export const useDeleteMutate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: delData,
      onSuccess: (data, variables) => Promise.all([
        variables.key.forEach(key => {
          queryClient.invalidateQueries({ queryKey: [key] });
        })
      ])
    }
  )
}

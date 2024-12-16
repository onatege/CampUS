import { configureStore, createSlice } from "@reduxjs/toolkit"
import userSlice from "./slices/user-slice";

const tokenSlice = createSlice({
    name:'token',
    initialState:{token: ""},
    reducers:{
        getToken(state, action){
            state.token = action.payload
        },
        clearToken(state){
            state.token = "";
        }
    }
})

export const tokenActions = tokenSlice.actions;
const store = configureStore({
    reducer:{
        token : tokenSlice.reducer,
        user   : userSlice.reducer,
    }
})

export default store;
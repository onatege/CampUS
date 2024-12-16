import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState:{user:[]},
    reducers:{
        replaceUser(state, action){
            state.user = action.payload
        }
    }

})

// export const getUserDataThunk = (url) => {
//    return async (dispatch) => {
//        try {
//            await get(url).then((response) => {
//                dispatch(userActions.replaceUser(response))
//              })
//              .catch((error) => {
//                console.error('There is an error while requesting (users) Get:', error);
//              });
//        } 
//        catch (error) {
//            console.log(error)
//        }
//    }
//}

export const userActions = userSlice.actions;
export default userSlice;
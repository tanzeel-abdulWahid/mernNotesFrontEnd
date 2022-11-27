import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        token:null
    },
    reducers:{
        setCredentials: (state, aciton) => {
            const {accessToken} = aciton.payload;
            state.token = accessToken
        },
        logOut:(state, action)=>{
            state.token = null
        }
    }
})

// //* to use it in diff components
export const {setCredentials, logOut} = authSlice.actions;

// //* to put this is store.js
export default authSlice.reducer;

// //* select token function....
export const selectCurrentToken = (state) => state.auth.token;



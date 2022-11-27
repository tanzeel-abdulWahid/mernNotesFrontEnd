import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials:'include',

    // * When you want to add headers to request
    prepareHeaders:(headers, {getState}) => {
        // get state (state of redux)
        const  token = getState().auth.token

        if (token) {
            // setting headers if token exists ==>
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReAuth = async(args, api, extraOptions) => {
    console.log("args", args, "API", api, "EXTRA OPTIONSS", extraOptions);

    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 403){
        console.log("Sending Refresh Token")

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        //store the new token
        if (refreshResult?.data) {
            api.dispatch(setCredentials({...refreshResult.data}));

            // retry query with new access token
            result = await baseQuery(args, api, extraOptions)
        }else{
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Login has expired"
            }
            return refreshResult
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})
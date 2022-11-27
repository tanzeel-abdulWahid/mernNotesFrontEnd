import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            // //* accepting data as Credentials
            query: credentials => ({
                url: '/auth',
                method:'POST',
                body: {...credentials}
            }),
        }),

        sendLogout: builder.mutation({
            query : () => ({
                url:'/auth/logout',
                method:'POST'
            }),
            // when query starts...
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try {
                    // //* THE DATA WE WILL GET AFTER QUERY IS FULFILLED
                    const {data} = await queryFulfilled;
                    console.log("ONQUERYFULFILLED", data)
                    // //*DISPATCHING THE LOGOUT ACTION WHEN QUERY FULFILLED,
                    dispatch(logOut())
                    // //*RESETING  ALL API STATE WHEN  USER LOGOUTS (NOTES, USERS LIST etc)
                    setTimeout(() => {
                        dispatch(() => {
                            dispatch(apiSlice.util.resetApiState());
                        })
                    }, 1000);
                } catch (error) {
                    console.log("ERR LOGOUT",err)
                }
            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method:"GET",
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled;
                    console.log("REFRESSHHH DATA", data);
                    const {accessToken} = data;
    
                    dispatch(setCredentials({accessToken}))
                }catch(err){
                    console.log("ERRRR REFRESHH",err);
                }
            }
        })
    })
})

export const {useLoginMutation,useSendLogoutMutation, useRefreshMutation } = authApiSlice
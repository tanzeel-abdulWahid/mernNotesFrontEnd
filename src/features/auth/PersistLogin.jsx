import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersists";


const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    // (isUninitialized)When true, indicates that the mutation has not been fired yet.
    const [refresh, {isUninitialized,isLoading, isSuccess, isError, error}] = useRefreshMutation();
    
    useEffect(()=> {
        // to check for react strict mode
        if(effectRan.current === true || process.env.NODE_ENV !== 'development'){
            const verifyRefreshToken = async () => {
                console.log('veryfying refresh token');

                try {
                    await refresh()
                    // console.log(response.data);
                    setTrueSuccess(true);
                } catch (error) {
                    console.log(true);
                }
            }

            if (!token && persist) verifyRefreshToken();
        }
        return () => effectRan.current = true
    },[])

    let content;

    if(!persist){
        console.log('no persist');
        content = <Outlet />
    }else if(isLoading){
        console.log('Loadingggg....');
        content = <p>Loadinggg</p>
    }else if(isError){
        console.log("error occured");
        content = (
            <p className="errmsg">
                {error?.data?.message}
                <Link to="/login"> Please Login again</ Link>
            </p>
        )
    }else if(isSuccess && trueSuccess){
        console.log('success');
        content = <Outlet />
    }  else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    } 
    
    return content
}

export default PersistLogin;
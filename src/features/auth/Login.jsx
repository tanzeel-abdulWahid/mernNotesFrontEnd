import { useState, useEffect, useRef } from "react"
import { useLoginMutation } from "./authApiSlice"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"

import {Link, useNavigate} from 'react-router-dom';
import usePersist from "../../hooks/usePersists";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // //* passing username & pass in login mutation and getting accessToken in a response from destructuring
            const {accessToken} = await login({username, password}).unwrap();
            // //* once its logged in it will perform the following
            console.log("accessToken", accessToken)
            dispatch(setCredentials({accessToken}))
            setUsername('')
            setPassword('')
            navigate('/dash')

        } catch (err) {
            if (!err.status) {
                setErrMsg("Np response from server")
            }else{
                setErrMsg(err.data?.message);
            }
        }
    }


    const errClass = errMsg ? 'errmsg' : 'offscreen'

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text"
                    className="form__input"
                    id="username"
                    ref={userRef}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    required autoComplete="off"/>

                    <label htmlFor="password">Password</label>
                    <input type="password"
                    id="password"
                    className="form__input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required />

                    {/* // it is by default  SUBMIT */}
                    <button className="form__submit-button">Sign in</button>

                    <label htmlFor="persist" className="form__persist">
                        <input type="checkbox" className="form__checkbox" id="persist"
                        onChange={() => setPersist(prev => !prev)} checked={persist} />
                        Trust this device
                    </label>
                </form>
            </main>
            <footer>
                <Link to='/'>Back to Home</Link>
            </footer>
        </section>
    )
    return content
}
export default Login
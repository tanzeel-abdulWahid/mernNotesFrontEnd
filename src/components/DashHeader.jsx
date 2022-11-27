import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'


const DashHeader = () => {
    const {isManager, isAdmin} = useAuth();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const [sendLogout, {isLoading, isSuccess,isError, error}] = useSendLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    },[isSuccess])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass;


    let newNoteButton = null

    if (pathname == '/dash/notes'){
        newNoteButton = (
            <button className='icon-button'
            title='New Note'
            onClick={onNewNoteClicked}>
                <FontAwesomeIcon icon={faFileCirclePlus}/>
            </button>
        )
    }

    let newUserButton = null

    if (pathname == '/dash/users') {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null

    if (isManager || isAdmin) {
        if (pathname !== '/dash/users' && pathname.includes('/dash')) {
            userButton = (
                <button
                className="icon-button"
                title="Users"
                onClick={onUsersClicked}
            >
                <FontAwesomeIcon icon={faUserGear} />
            </button>
            )
        }
    }

    let notesButton = null
    if (pathname !== '/dash/notes' && pathname.includes('/dash')) {
        notesButton = (
            <button
            className="icon-button"
            title="Notes"
            onClick={onNotesClicked}
        >
            <FontAwesomeIcon icon={faFilePen} />
        </button>
        )
    }

    const logoutButton = (
        <button className='icon-button'
        title='Logout'
        onClick={sendLogout}>
            <FontAwesomeIcon icon={faRightFromBracket}/>
        </button>
    )

    const errClass = isError ? 'errmsg' : 'offscreen'

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging out...</p>
    }else{
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons later */}
                    {buttonContent}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader
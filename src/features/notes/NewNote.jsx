// import {useSelector} from 'react-redux';
// import {selectAllUsers} from '../users/usersApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';
import NewNoteForm from './NewNoteForm';
import PulseLoader from 'react-spinners/PulseLoader'


const NewNote = () => {
    // const users = useSelector(selectAllUsers);

    const {users} = useGetUsersQuery('usersList',{
        selectFromResult:({data}) => ({
            users : data?.ids.map(id => data?.entities[id]) 
        })
    })

    console.log("users in new note===" ,users);

    // When WE DONT have access to users;
    if (!users.length) {
        return <PulseLoader color={"#fff"}/>
    }

    const content = <NewNoteForm users={users}/>

    return content
}

export default NewNote
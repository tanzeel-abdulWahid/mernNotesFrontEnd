import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectNoteById } from "./notesApiSlice"
import { selectAllUsers } from "../users/usersApiSlice"
import EditNoteForm from './EditNoteForm';
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";


const EditNote = () => {
    const {id} = useParams();

    const {username, isManager, isAdmin} = useAuth();

    const { note } = useGetNotesQuery('notesList',{
        selectFromResult:({data}) => ({
            note : data?.entities[id]
        })
    })

    
    const {users} = useGetUsersQuery('usersList',{
        selectFromResult:({data}) => ({
            // console.log(data)
            users : data?.ids.map(id => data?.entities[id]),
            
    })
    })

    console.log("USEr", users);
    console.log("single Note", note);
    
    if (!note || !users?.length) return <PulseLoader color={'#FFF'}/>
    if (!isManager && !isAdmin) {
        if (note.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }
    // console.log("NoteId", id);

    // const note = useSelector(state => selectNoteById(state, id));
    // const users = useSelector(selectAllUsers);
    // const content = note && users ? <EditNoteForm users={users} note={note}/> : <p>Loading...</p>
    
    const content = <EditNoteForm note={note} users={users}/>
    return content
}

export default EditNote
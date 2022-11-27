import { useParams } from "react-router-dom"
// import { useSelector} from "react-redux"
// import { selectUserById } from "./usersApiSlice"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from 'react-spinners/PulseLoader'

const EditUser = () => {
    const {id} = useParams();

    // const user = useSelector((state) => selectUserById(state,id));

    const {user} = useGetUsersQuery('usersList',{
        selectFromResult:({data}) => ({
            user : data?.entities[id]
        })
    })
    console.log("Sinlge user", user);

    // let content = user ? <EditUserForm user={user} /> : <p>Loaing...</p>
    
    if (!user) return <PulseLoader color={'#fff'} />

    const content = <EditUserForm user={user}/>

    return content
}

export default EditUser
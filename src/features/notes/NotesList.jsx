import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
const NotesList = () => {
    const {username, isManager, isAdmin} = useAuth();
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList',{
        pollingInterval:15000, // refetch data after 60 secs
        refetchOnFocus:true, //refetch queries when window gains focus
        refetchOnMountOrArgChange: true //refetch when any data is added or deleted
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes
        // console.log("Entitiessss", entities);
        // console.log("idss",ids);
        // console.log("usernameee", username);

        let filteredIds
        
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        }else{
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }
        // console.log("Filtered DAta", filteredIds);
        const tableContent =  ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__status">Username</th>
                        <th scope="col" className="table__th note__created">Created</th>
                        <th scope="col" className="table__th note__updated">Updated</th>
                        <th scope="col" className="table__th note__title">Title</th>
                        <th scope="col" className="table__th note__username">Owner</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default NotesList
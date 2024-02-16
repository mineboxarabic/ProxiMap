import { useEffect, useState } from "react"

import useRefreshToken from "../../Hooks/useRefreshToken";
import { axiosPrivate } from "../../api/axios";
const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {

        const getUsers = async () => {
            try{
                const response = await axiosPrivate.get('/users');
                console.log(response?.data);
                setUsers(response?.data);
            }catch(error){
                console.log(error);
            }
        };

        getUsers();
    }, [])

    const refresh = useRefreshToken();
    return (
        <main>
            <h1>View Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&  users?.length > 0
                     ? users?.map(user => (


                        // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
                        <tr key={user._id}>
                            
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    )): <tr><td>No users found</td></tr>}
                </tbody>
            </table>
            <button onClick={refresh} >Refresh</button>
        </main>
    )
}

export default ViewUsers
import { useEffect, useState } from "react"
import axios from "../../api/axios";
import useRefreshToken from "../../Hooks/useRefreshToken";
const ViewUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let mounted = true;
        const controller = new AbortController();


        const getUsers = async () => {
            try{
                const response = await axios.get('/users', {
                    signal: controller.signal,
                });
                console.log(response.data);
                mounted && setUsers(response.data);
            }catch(error){
                console.log(error);
            }
        };

        getUsers();
        return () => {
            mounted = false;
            controller.abort();
        }
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
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={refresh} >Refresh</button>
        </main>
    )
}

export default ViewUsers
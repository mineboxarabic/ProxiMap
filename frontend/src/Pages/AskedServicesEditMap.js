import useCurrentUser from "../Hooks/useCurrentUser";
import MapEdit from "./Partner/MapEdit";

const AskedServiceEditMap = () =>{
    const nameOfClass = 'askedServices';
    const currentUser = useCurrentUser();
    const deafultService = {
        userId: currentUser._id,
        categoryId: '',
        name: '',
        description: '',
        price: 0,
        position: {
            type: 'Point',
            coordinates: [0,0]
        },
        date: new Date(),
        status:'pending'
    }
    return(<>
        <MapEdit nameOfClass={nameOfClass} defaultModel={deafultService}/>
    </>)
};

export default AskedServiceEditMap;
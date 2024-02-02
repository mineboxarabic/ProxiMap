import useCurrentUser from "../Hooks/useCurrentUser";
import MapEdit from "./Partner/MapEdit";

const AskedServiceEditMap = () =>{
    const nameOfClass = 'askedServices';
    const currentUser = useCurrentUser();
    const deafultService = {
        partnerId: currentUser._id,
        categoryId: '',
        name: '',
        description: '',
        price: '',
        availability: false,
        ratings: [],
        position: {
            coordinates: [0,0]
        },
        range: 0,
        status:'pending'
    }
    return(<>
        <MapEdit nameOfClass={nameOfClass} defaultModel={deafultService}/>
    </>)
};

export default AskedServiceEditMap;
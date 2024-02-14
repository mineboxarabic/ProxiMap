import useCurrentUser from "../Hooks/useCurrentUser";
// @ts-expect-error TS(2307): Cannot find module './Partner/MapEdit' or its corr... Remove this comment to see the full error message
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
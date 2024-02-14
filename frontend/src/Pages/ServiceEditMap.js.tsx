import useCurrentUser from "../Hooks/useCurrentUser";
// @ts-expect-error TS(2307): Cannot find module './Partner/MapEdit' or its corr... Remove this comment to see the full error message
import MapEdit from "./Partner/MapEdit";

const ServiceEditMap = () =>{
    const nameOfClass = 'services';
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

export default ServiceEditMap;
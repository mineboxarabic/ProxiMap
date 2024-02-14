
import './Style/App.scss';
// @ts-expect-error TS(2307): Cannot find module './Pages/User/Login' or its cor... Remove this comment to see the full error message
import LogIn from './Pages/User/Login';
import { Route, Routes } from 'react-router-dom';
// @ts-expect-error TS(2307): Cannot find module './Pages/MainLayout' or its cor... Remove this comment to see the full error message
import MainLayout from './Pages/MainLayout';
// @ts-expect-error TS(2307): Cannot find module './Pages/User/Register' or its ... Remove this comment to see the full error message
import Register from './Pages/User/Register';

// @ts-expect-error TS(2307): Cannot find module './Pages/Home' or its correspon... Remove this comment to see the full error message
import Home from './Pages/Home';
// @ts-expect-error TS(2307): Cannot find module './Pages/About' or its correspo... Remove this comment to see the full error message
import About from './Pages/About';
// @ts-expect-error TS(2307): Cannot find module './Pages/Error/UnAutherized' or... Remove this comment to see the full error message
import UnAutherized from './Pages/Error/UnAutherized';
// @ts-expect-error TS(2307): Cannot find module './Pages/Error/NotFound' or its... Remove this comment to see the full error message
import NotFound from './Pages/Error/NotFound';
// @ts-expect-error TS(2307): Cannot find module './Pages/Admin/ViewUsers' or it... Remove this comment to see the full error message
import ViewUsers from './Pages/Admin/ViewUsers';

// @ts-expect-error TS(2307): Cannot find module './Components/RequireAuth' or i... Remove this comment to see the full error message
import RequireAuth from './Components/RequireAuth';
// @ts-expect-error TS(2307): Cannot find module './Components/PersistLogin' or ... Remove this comment to see the full error message
import PersistLogin from './Components/PersistLogin';
// @ts-expect-error TS(2307): Cannot find module './Pages/Admin/CRUD/CRUDUser' o... Remove this comment to see the full error message
import CRUDUser from './Pages/Admin/CRUD/CRUDUser';
// @ts-expect-error TS(2307): Cannot find module './Pages/Admin/CRUD/CRUDService... Remove this comment to see the full error message
import CRUDService from './Pages/Admin/CRUD/CRUDService';

import { ADMIN, USER, PARTNER, MANAGER, STAFF } from './Helpers/Roles';
// @ts-expect-error TS(2307): Cannot find module './Pages/Map' or its correspond... Remove this comment to see the full error message
import Map from './Pages/Map';
// @ts-expect-error TS(2307): Cannot find module './Pages/Profile' or its corres... Remove this comment to see the full error message
import ProfilePage from './Pages/Profile';
// @ts-expect-error TS(2307): Cannot find module './Pages/Admin/CRUD/CRUDCategor... Remove this comment to see the full error message
import CRUDCategory from './Pages/Admin/CRUD/CRUDCategory';
// @ts-expect-error TS(2307): Cannot find module './Pages/Partner/MapEdit' or it... Remove this comment to see the full error message
import MapEdit from './Pages/Partner/MapEdit';
// @ts-expect-error TS(2307): Cannot find module './Pages/ServiceEditMap' or its... Remove this comment to see the full error message
import ServiceEditMap from './Pages/ServiceEditMap';
// @ts-expect-error TS(2307): Cannot find module './Pages/AskedServicesEditMap' ... Remove this comment to see the full error message
import AskedServiceEditMap from './Pages/AskedServicesEditMap';
// @ts-expect-error TS(2307): Cannot find module './Pages/FilteredMap/FilteredMa... Remove this comment to see the full error message
import FilteredMap from './Pages/FilteredMap/FilteredMap';
// @ts-expect-error TS(2307): Cannot find module './Pages/Admin/CRUD/CRUDAskedSe... Remove this comment to see the full error message
import CRUDAskedService from './Pages/Admin/CRUD/CRUDAskedService';



function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />} >

        <Route element={<PersistLogin />}>

          {/* Public Routes */}

          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/'  element={<Home />} />
          <Route path='/home'  element={<Home />} />

          <Route path='/login' element={<LogIn />} />

          {/*Parnter only orutes */}
          <Route element={<RequireAuth allowedRoles={[PARTNER, ADMIN]} />}>
            <Route path='/services/edit' element={<ServiceEditMap />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[PARTNER, ADMIN, USER]} />}>
            <Route path='/services/edit/user' element={<AskedServiceEditMap />} />
          </Route>

          {/* Private Routes */}


          {/* Admin Routes */}
          <Route element={<RequireAuth allowedRoles={[ADMIN]} />}>

            <Route path='/admin/viewusers' element={<ViewUsers />} />
            <Route path='/users' element={<CRUDUser />} />
            <Route path='/services' element={<CRUDService />} />
            <Route path='/categorys' element={<CRUDCategory />} />
            <Route path='/askedServices' element={<CRUDAskedService />} />



          </Route>

          {/* User Routes */}
          <Route element={<RequireAuth allowedRoles={[ADMIN, USER]} />}>
          </Route>

          {/* All Roles Routes */}
          <Route element={<RequireAuth allowedRoles={[ADMIN, USER, PARTNER, MANAGER, STAFF]} />}>
            <Route path='/map/inview' element={<Map />} />
            <Route path='/map' element={<FilteredMap />} />

            <Route path='/profile' element={<ProfilePage />} />
          </Route>


          {/* Catch all */}
          <Route path='/*' element={<NotFound />} />
          <Route path='/unautherized' element={<UnAutherized />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;

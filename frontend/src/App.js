
import './Style/App.scss';
import LogIn from './Pages/User/Login';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './Pages/MainLayout';
import Register from './Pages/User/Register';

import Home from './Pages/Home';
import About from './Pages/About';
import UnAutherized from './Pages/Error/UnAutherized';
import NotFound from './Pages/Error/NotFound';
import ViewUsers from './Pages/Admin/ViewUsers';

import RequireAuth from './Components/RequireAuth';
import PersistLogin from './Components/PersistLogin';
import CRUDUser from './Pages/Admin/CRUD/CRUDUser';
import CRUDService from './Pages/Admin/CRUD/CRUDService';

import { ADMIN, USER, PARTNER, MANAGER, STAFF } from './Helpers/Roles';
import Map from './Pages/Map';
import ProfilePage from './Pages/Profile';
import CRUDCategory from './Pages/Admin/CRUD/CRUDCategory';
import MapEdit from './Pages/Partner/MapEdit';
import ServiceEditMap from './Pages/ServiceEditMap';
import AskedServiceEditMap from './Pages/AskedServicesEditMap';
import FilteredMap from './Pages/FilteredMap/FilteredMap';
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

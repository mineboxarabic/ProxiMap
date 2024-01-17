
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

import { ADMIN, USER, Partner, Manager, Staff } from './Helpers/Roles';
import Map from './Pages/Map';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />} >

        {/* Public Routes */}
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/home' element={<Home />} />

        {/* Private Routes */}


        <Route element={<PersistLogin />}>
          {/* Admin Routes */}
          <Route element={<RequireAuth allowedRoles={[ADMIN]} />}>
            <Route path='/admin/viewusers' element={<ViewUsers />} />
            <Route path='/users' element={<CRUDUser />} />
            <Route path='/services' element={<CRUDService />} />

          </Route>
      
            {/* User Routes */} 
          <Route element={<RequireAuth allowedRoles={[ADMIN,USER]} />}>
            <Route path='/map' element={<Map />} />
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

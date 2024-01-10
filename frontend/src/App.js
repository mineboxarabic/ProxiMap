
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
const ADMIN = 'Admin';
const USER = 'User';
const Partner = 'Partner';
const Manager = 'Manager';
const Staff = 'Staff';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />} >
      <Route element={<PersistLogin />}>
        {/* Public Routes */}
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/home' element={<Home />} />


        {/* Private Routes */}


          <Route element={<RequireAuth allowedRoles={[ADMIN]} />}>
            <Route path='/admin/viewusers' element={<ViewUsers />} />
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

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/homepage/HomePage';
import Login from './components/admin/adminLogin';
import AdminRegister from './components/admin/empRegister';
import UserRegister from './components/users/userRegister';
import UserLogin from './components/users/userLogin';
import BirthForm from './components/services/Birth';
import PaymentForm from './components/pages/Payment';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/adminLog' element={<Login />} />
          <Route path='/empReg' element={<AdminRegister />} />
          <Route path='/userReg' element={<UserRegister />} />
          <Route path='/userLog' element={<UserLogin />} />
          <Route path='/birth' element={<BirthForm />} />
          <Route path='/payment' element={<PaymentForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

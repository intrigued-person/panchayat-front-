import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/homepage/HomePage';
import Login from './components/admin/adminLogin';
import AdminRegister from './components/admin/empRegister';
import UserRegister from './components/userRegister/userRegister';
import UserLogin from './components/users/userLogin';
import BirthForm from './components/services/Birth';
import PaymentForm from './components/pages/Payment';
import UserLanding from './components/landing/userLanding';
import DashBoard from './components/landing/adminDash';
import BirthRecords from './components/pages/BirthView';
import EmpBirth from './components/pages/EmpBirthView';
import BirthLayer from './components/pages/BirthLayer';
import ViewBirthDetails from './components/users/ViewBirthDetails';
import BirthCertificate from './components/certificates/BirthCertificate';
import DeathForm from './components/services/Death';
import DeathLayer from './components/pages/DeathLayer';
import DeathView from './components/pages/DeathView';
import EmpDeathView from './components/pages/EmpDeathView';
import DeathCertificate from './components/Death/DeathCertificate';
import IssueForm from './components/services/Issues';
import IssuesTable from './components/issue/IssueHistory';
import IssueTable from './components/issue/Allissues';
import ViewUser from './components/users/ViewUser';
import ViewEmp from './components/users/ViewEmp';
import Navbar from './components/navComp/Navbar';
import Nav from './components/navComp/Nav';
import NavB from './components/navComp/NavB';
import EditProfile from './components/update/userUpdate';
import PaymentUser from './components/update/PaymentUser';
import ApprovalForm from './components/services/Approval';
import FindBirthByUserId from './components/update/Search';


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
          {/* <Route path='/payment' element={<PaymentForm />} /> */}
          <Route path='/userLand' element={<UserLanding />} />
          <Route path='/adminDash' element={<DashBoard />} />
          <Route path='/birthView' element={<BirthRecords />} />
          <Route path='/empBirthView' element={<EmpBirth />} />
          <Route path='/birthLayer' element={<BirthLayer />} />
          <Route path='/birthDetails' element={<ViewBirthDetails />} />
          <Route path='birthct' element={<BirthCertificate />} />
          <Route path='/death' element={<DeathForm />} />
          <Route path='/deathLayer' element={<DeathLayer />} />
          <Route path='/deathView' element={<DeathView />} />
          <Route path='/empDeathView' element={<EmpDeathView />} />
          <Route path='/deathct' element={<DeathCertificate />} />
          <Route path='/issue' element={<IssueForm />} />
          <Route path='/issueTable' element={<IssuesTable />} />
          <Route path='/empIssue' element={<IssueTable />} />
          <Route path='/viewUsers' element={<ViewUser />} />
          <Route path='/viewEmps' element={<ViewEmp />} />
          <Route path='/userNav' element={<Navbar />} />
          <Route path='/empNav' element={<Nav />} />
          <Route path='/adNav' element={<NavB />} />
          <Route path='/editUser' element={<EditProfile />} />
          <Route path='/pay' element={<PaymentUser />} />
          <Route path='/approval' element={<ApprovalForm />} />
          <Route path='/search' element={<FindBirthByUserId />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

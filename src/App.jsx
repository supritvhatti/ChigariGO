import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Feedback from './components/feedback';
import Entry from './components/entry'; // Entry as the first page
import Booking from './components/booking';
import Payment from './components/payment';
import RouteMap from './components/routemap';
import StudentPass from './components/studentpass';
import StudentRegister from './components/studentregister';
import StudentFormSubmission from './components/studentFormSubmission';
import About from './components/about';
import Profile from './components/profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Set Entry as the default route */}
          <Route path="/" element={<Entry />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/routemap" element={<RouteMap />} />
          <Route path="/studentpass" element={<StudentPass />} />
          <Route path="/studentregister" element={<StudentRegister />} />
          <Route path="/studentformsubmission" element={<StudentFormSubmission />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

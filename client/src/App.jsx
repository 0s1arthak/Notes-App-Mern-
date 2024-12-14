import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Main from './pages/Main'; // Import the Main page
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="relative h-screen w-screen bg-slate-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

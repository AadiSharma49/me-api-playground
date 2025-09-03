import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import ProfileView from './components/ProfileView';
import ProfileForm from './components/ProfileForm';
import UpdateProfile from './components/UpdateProfile';
import DeleteProfile from './components/DeleteProfile';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function Home() {
  const [selectedRollNo, setSelectedRollNo] = useState(null);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
      <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
        <StudentList onSelect={setSelectedRollNo} />
      </div>
      <div style={{ flex: '2 1 400px', minWidth: '400px' }}>
        <ProfileView rollNo={selectedRollNo} />
      </div>
    </div>
  );
}

function AddProfilePage() {
  return <ProfileForm onProfileCreated={() => {}} />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  if (!loggedIn) {
    // Auth routes
    return (
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={() => setLoggedIn(true)} />}
          />
          <Route
            path="/register"
            element={
              <RegisterPage onRegister={() => window.location.assign('/login')} />
            }
          />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-profile" element={<AddProfilePage />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/update-profile/profile/:rollNo" element={<UpdateProfile />} />
        <Route path="/delete-profile" element={<DeleteProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

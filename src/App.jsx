import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { disableReactDevtools } from '@fvilers/disable-react-devtools';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ViewCafe from './pages/ViewCafe';
import Rate from './pages/Rate';
import ViewUserProfile from './pages/ViewUserProfile';
import EditProfile from './pages/EditProfile';
import About from './pages/About';

if (process.env.NODE_ENV === 'production') disableReactDevtools();

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route 
            path="/auth/login"
            element={<Login />}
          />
          <Route 
            path="/auth/register" 
            element={<Register />} 
          />
          <Route 
            path="/cafes"
            element={<Dashboard />}
          />
          <Route 
            path="/profile/:id"
            element={<Profile />}
          />
          <Route
            path="/cafe/:name/:id"
            element={<ViewCafe />}
          />
          <Route
            path="/review/:id"
            element={<Rate/>}
          />
          <Route 
            path="/users/:id"
            element={<ViewUserProfile />}  
          />
          <Route 
            path="/profile/edit"
            element={<EditProfile />}  
          />
          <Route
            path="/about"
            element={<About />} 
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';

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
        </Routes>
      </Router>
    </div>
  )
}

export default App

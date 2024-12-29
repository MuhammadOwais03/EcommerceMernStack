import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import AddItems from './pages/AddItems';

function App() {
  return (
    <Router>
      <div className="main-admin-container">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main-body">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="other">
            {/* Define routes here */}
            <Routes>
              <Route path="/add" element={<AddItems />} />
              <Route path="/list" element={<h1>List</h1>} />
              <Route path="/orders" element={<h1>Orders</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
